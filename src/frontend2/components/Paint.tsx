import dynamic from "next/dynamic";
import { MainMenu, WelcomeScreen, exportToSvg } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI, ImportedDataState, ExcalidrawElement } from "@excalidraw/excalidraw/dist/excalidraw/types";
import { getUserLiveData, uploadLive, uploadFinal } from "@/app/scripts/paint";
import { useEffect, useState } from "react";
import { checkAuth } from "@/app/auth/auth";
import { updateMosaic } from "@/app/scripts/groups";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);

/**
 * Excalidraw library, used for whiteboard page
 * @param param0 group ID of the selected group
 * @returns the actual whiteboard feature
 */
export default function Paint({ group }: { group: number}) {


    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);
    const [svg, setSvg] = useState<SVGSVGElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<ImportedDataState>({ elements: [], appState: {}, scrollToContent: true });
    const [save, setSave] = useState("Save");
    const [upload, setUploaded] = useState("Done drawing!");

    let user: string | undefined = "";

    useEffect(() => {
        async function fetchData() {
            user = await checkAuth();
            if (!user) {
                return;
            }
            let d = await getUserLiveData(user, group);
            if (d.active_drawing_json != null) {
                if (excalidrawAPI != null) {
                    excalidrawAPI.updateScene({ elements: d.active_drawing_json.elements });
                } else {
                    setInitialData({ elements: d.active_drawing_json.elements, appState: {}, scrollToContent: true });
                }
            }
            if (d.active_drawing_svg != null) {
                setSvg(d.active_drawing_svg);
            }
            setLoading(false);
        }

        if (loading) {
            fetchData();
        }
    });

    let saveLiveToCloud = async () => {
        setSave("Saving...");
        let elements = await excalidrawAPI.getSceneElements();
        user = await checkAuth();
        if (user && user!="") {
            await uploadLive(user, group, elements);
        }
        setSave("Saved!");
        setTimeout(() => {setSave("Save")}, 1500);
    }

    let saveFinishedToCloud = async () => {
        setUploaded("Uploading...");
        saveLiveToCloud();
        let elements = await excalidrawAPI.getSceneElements();
        const svg = await exportToSvg({
            elements: elements,
            appState: {},
        });
        user = await checkAuth();
        if (user && user!="") {
            setSvg(svg);
            await uploadFinal(user, group, svg.innerHTML);
        }
        setUploaded("Uploaded!");
        setTimeout(() => {setUploaded("Done drawing!")}, 1500);
    }



    return (
        <>
            {loading ?
                <>
                    <span className="loading loading-spinner loading-lg"></span>
                    <p>Loading...</p>
                </>
                :
                <>
                    <div className="flex flex-row space-x-4">
                        <button
                            onClick={saveLiveToCloud}
                            className="btn btn-secondary">
                            {save}
                        </button>
                        <button
                            onClick={saveFinishedToCloud}
                            className="btn btn-primary">
                            {upload}
                        </button>
                    </div>
                    <div style={{ height: "450px" }} className="custom-styles">
                        <Excalidraw
                            onChange={(elements, state) => {

                            }}
                            initialData={initialData}
                            UIOptions={{ tools: { image: false } }}
                            excalidrawAPI={(api) => {
                                setExcalidrawAPI(api);
                            }}>
                            <MainMenu>
                                <MainMenu.DefaultItems.Export />
                            </MainMenu>
                            <WelcomeScreen>
                                <WelcomeScreen.Hints.ToolbarHint>
                                    <p> Pick a tool and start drawing! </p>
                                </WelcomeScreen.Hints.ToolbarHint>
                            </WelcomeScreen>
                        </Excalidraw>
                    </div>
                </>
            }
        </>
    )
}