import dynamic from "next/dynamic";
import { MainMenu, WelcomeScreen, exportToSvg } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI, ImportedDataState, ExcalidrawElement } from "@excalidraw/excalidraw/dist/excalidraw/types";
import { getUserLiveData, uploadLive } from "@/app/scripts/paint";
import { useEffect, useState } from "react";
import { checkAuth } from "@/app/auth/auth";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);


export default async function Paint({ group }: { group: number }) {


    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);
    const [svg, setSvg] = useState<SVGSVGElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<ImportedDataState>({ elements: [], appState: {}, scrollToContent: true });

    //let live = await getUserLiveData("user", group);
    //console.log(live);

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
            setLoading(false);
        }

        if (loading) {
            fetchData();
        }
    });

    let saveLiveToCloud = async () => {
        let elements = excalidrawAPI.getSceneElements();
        user = await checkAuth();
        if (user && user!="") {
            await uploadLive(user, group, elements);
        }
    }

    let saveFinishedToCloud = async () => {
        const svg = await exportToSvg({
            elements: excalidrawAPI.getSceneElements(),
            appState: {},
        });
        //document.querySelector(".export-svg")!.innerHTML = svg.outerHTML;
        setSvg(svg);
        // uploadLive(excalidrawAPI.getSceneElements());
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
                            Save
                        </button>
                        <button
                            onClick={saveFinishedToCloud}
                            className="btn btn-primary">
                            Done drawing!
                        </button>
                    </div>
                    <div style={{ height: "550px" }} className="custom-styles">
                        <Excalidraw
                            onChange={(elements, state) => {

                            }}
                            initialData={initialData}
                            UIOptions={{ tools: { image: false } }}
                            excalidrawAPI={(api) => {
                                console.log(initialData);
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
                        <div className="">
                            {
                                svg != null ?
                                    <svg dangerouslySetInnerHTML={{ __html: svg.innerHTML }} />
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}