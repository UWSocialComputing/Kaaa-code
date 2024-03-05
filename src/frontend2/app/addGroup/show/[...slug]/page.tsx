"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import Link from "next/link";

/**
 * Page that users are taken to after successfully creating a group
 * @param param0 the ID of the group that was just created
 * @returns the group created screen
 */
export default function Page({ params }: { params: { slug: string } }) {
    // Query backend for user data

    // State to hold the copy text to allow re-render
    const [copyText, setCopyText] = useState("(^^ click to copy)");
    
    let copy = (e: any) => {
        // copy the magic invite link to clipboard
        setCopyText("Copied!");
        navigator.clipboard.writeText(window.location.origin + "/addGroup/join/"+params.slug[0]);
        setTimeout(() => { setCopyText("(^^ click to copy)"); }, 2000);
    }

    return (
        <>
            <div className="flex-1 flex w-full px-8 sm:max-w-md justify-center gap-2">
                <Link
                    href="/dashboard"
                    className="absolute left-8 z-50 top-20 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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

                <div className="pt-96 text-success text-center space-y-3 flex flex-col">
                    <p>Group Created!</p>
                    <p>Share this link with your friends so they can join:</p>
                    <button onClick={copy} className="text-primary border border-primary rounded-lg p-2 hover:bg-primary hover:text-white">https://localhost:3000/addgroup/join/{params.slug[0]}</button>
                    <p className="text-warning">{copyText}</p>
                    <Link href="/dashboard" className="btn btn-primary hover:ring ring-primary ring-offset-2 rounded-md px-4 py-2 mb-2 text-center">
                        Continue to Dashboard
                    </Link>
                </div>
            </div>
        </>
    )
};