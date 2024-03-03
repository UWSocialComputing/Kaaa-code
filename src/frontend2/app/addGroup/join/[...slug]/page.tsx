"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { checkAuth } from "@/app/auth/auth";
import { updateUserWithNewGroup } from "@/app/scripts/groups";

/**
 * Page that users are taken to after clicking a join group link
 * @param param0 The ID of the group to be joined
 * @returns The join group page
 */
export default async function Page({ params }: { params: { slug: string } }) {
    // Query backend for user data
    const [joining, setJoining] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        checkAuth();
        joinGroup();
    });

    async function joinGroup() {
        if (joining) {
            let res = await updateUserWithNewGroup(parseInt(params.slug[0]));
            setFailed(!res);
            setJoining(false);
        }
    }

    return (
        <>
            {joining ?
                <div className="flex-1 flex flex-col place-items-center w-full px-8 sm:max-w-md justify-center gap-2">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p>Joining group...</p>
                </div> :
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

                    <div className="pt-96 text-success flex flex-col space-y-2 text-center">
                        {failed ?
                            <div role="alert alert-error" className="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-error w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>

                                <span className="text-error">Failed to join Group "{params.slug}"</span>
                            </div>
                            :
                            <>
                                <div role="alert" className="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-success">Joined Group "{params.slug}"</span>
                                </div>
                                <a href="/" className="text-sm text-primary underline">go to group &raquo;</a>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
};