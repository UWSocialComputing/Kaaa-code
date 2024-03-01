"use client"

import Paint from "@/components/Paint"
import Link from "next/link"

export default function Group({ params }: { params: { slug: string } }) {
    return (
        <div className="flex w-screen pt-16">
            <div className="flex flex-1 flex-col w-full px-8 w-8/12 justify-center">
                <Link
                    href="/dashboard"
                    className=" left-8 z-50 top-20 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
                        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                            Draw something you did today  🖌️
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
            <div className="w-1/6">
                <Link href="/dashboard">Whiteboard</Link>
            </div>
        </div>
    )
}