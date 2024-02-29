"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import Link from "next/link";

export default function Page({ params }: { params: { slug: string } }) {
    // Query backend for user data

    const [copyText, setCopyText] = useState("(^^ click to copy)");
    
    let copy = (e: any) => {
        setCopyText("Copied!");
        navigator.clipboard.writeText("https://localhost:3000/addGroup/join/"+params.slug[0]+"/"+params.slug[1]);
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
                    <button onClick={copy} className="text-primary border border-primary rounded-lg p-2 hover:bg-primary hover:text-white">https://localhost:3000/addgroup/join/{params.slug[0]}/{params.slug[1]}</button>
                    <p className="text-warning">{copyText}</p>
                    <Link href="/dashboard" className="bg-green-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-center">
                        Continue to Dashboard
                    </Link>
                </div>
            </div>
        </>
    )
};