"use client"

import Paint from "@/components/Paint"
import Link from "next/link"
import { redirect } from "next/navigation";
import { queryGroupData, leaveGroup, updatePrompt } from "@/app/scripts/groups";
import Countdown from './countdown';
import { useState, useEffect } from 'react';
import { shouldAllowVerticalAlign } from "@excalidraw/excalidraw/types/element/textElement";

/**
 * The top-level group page of the app. Tabs are sub-levels
 * @param param0 the ID of the group the user has selected
 * @returns the group page
 */
export default function Group({ params }: { params: { slug: string } }) {
    // Query backend for timestamp
    const [groupName, setGroupName] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [currentPrompt, setCurrentPrompt] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    useEffect(() => {
        setIsLoading(true);
        setTimestamp();
        setIsLoading(false);
    }, []);

    async function setTimestamp() {
        let data = await queryGroupData(params.slug);
        if (data) {
            if (data.timeLeft < 0) {
                setIsLoading(true);
                updatePrompt(params.slug, currentPrompt).then(data => {
                    setTimeLeft(data!.timeLeft);
                    setCurrentPrompt(data!.prompt);
                    setIsLoading(false);
                });
            }
            setTimeLeft(data.timeLeft);
            setGroupName(data.groupName);
            setCurrentPrompt(data.prompt);
        }
    }

    const copy = (e: any) => {
        navigator.clipboard.writeText("localhost:3000/addGroup/join/"+params.slug);
    }

    return (
        <div>
            {isLoading ? null : <div className="flex w-screen pt-16">
                <div className="flex flex-1 flex-col w-full px-8 w-8/12 justify-center">
                    <Link
                        href="/dashboard"
                        className=" left-8 z-50 top-20 py-2 px-4 w-full rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>{" "}
                        Back
                    </Link>

                    <div className="pb-10">
                        <div className="flex flex-col col-span-5">
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center text-4xl">
                                {currentPrompt}
                            </div>
                            <div className="divider"></div>
                            <div>
                                <div style={{ height: "50vh" }}>
                                    <Paint group={parseInt(params.slug)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/6 pt-9 justify-between justify-items-center space-y-4">
                    <button onClick={copy} className="grid place-items-center rounded-box h-20 text-2xl w-5/6 ring ring-secondary hover:ring-offset-2 ring-offset-0 hover:bg-secondary/[.5]">
                        {groupName} 🔗
                    </button>
                    <Countdown 
                        className="grid h-20 card ring ring-secondary rounded-box place-items-center text-2xl w-5/6"
                        timeLeft={timeLeft}
                        onTimeout={() => {}}>
                    </Countdown>
                    <Link href="/" className="grid place-items-center rounded-box h-20 text-2xl w-5/6 ring ring-primary hover:ring-offset-2 ring-offset-0 hover:bg-primary/[.5]">
                        Whiteboard
                    </Link>
                    <Link href="/group/mosaic" className="grid place-items-center rounded-box h-20 text-2xl w-5/6 ring ring-primary hover:ring-offset-2 ring-offset-0 hover:bg-primary/[.5]">
                        Mosaic
                    </Link>
                    <Link href="/group/gallery" className="grid place-items-center rounded-box h-20 text-2xl w-5/6 ring ring-primary hover:ring-offset-2 ring-offset-0 hover:bg-primary/[.5]">
                        Gallery
                    </Link>
                    <button onClick={() => leaveGroup(params.slug)} className="grid place-items-center rounded-box h-20 text-2xl w-5/6 ring ring-accent hover:ring-offset-2 ring-offset-0 hover:bg-accent/[.5]">
                        Leave Group
                    </button>
                </div>
            </div>}
        </div>
    )
}