import dynamic from "next/dynamic";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);


export default function Paint() {
    return (
        <div style={{ height: "550px" }} className="custom-styles">
            <Excalidraw
                initialData={{ appState: { theme: "dark" }, scrollToContent: true }}
                UIOptions={{tools: {image: false}}}>
                <MainMenu>
                    <MainMenu.Item onSelect={() => window.location.href = "https://uwsocialcomputing.github.io/Kaaa/"}>
                        Blog Post
                    </MainMenu.Item>
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.ToolbarHint>
                        <p> here are your paint tools </p>
                    </WelcomeScreen.Hints.ToolbarHint>
                    <WelcomeScreen.Hints.HelpHint >
                        <p> more info on tools and stuff </p>
                    </WelcomeScreen.Hints.HelpHint>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Logo>
                            KAAA 🦅🦅🦅
                        </WelcomeScreen.Center.Logo>
                        <WelcomeScreen.Center.Heading>
                            paint w your friends
                        </WelcomeScreen.Center.Heading>
                        <WelcomeScreen.Center.Menu>
                            <WelcomeScreen.Center.MenuItemLink href="https://uwsocialcomputing.github.io/Kaaa/">
                                Blog Post
                            </WelcomeScreen.Center.MenuItemLink>
                            <WelcomeScreen.Center.MenuItemHelp />
                        </WelcomeScreen.Center.Menu>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div>
    )
}