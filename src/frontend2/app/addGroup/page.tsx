"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { SubmitButton } from "../login/submit-button";
import { createGroup } from "../scripts/groups";
import { checkAuth } from "../auth/auth";

/**
 * Add group screen
 */
export default function Dashboard() {

    const [user, setUser] = useState<string>("");

    useEffect(() => {
        // check to make sure the user is authenticated

        let temp = async function () {
            let user = await checkAuth();
            if (!user) {
                alert("error unable to authenticate user")
            } else {
                setUser(user);
            }
        }

        temp();
    }, [user]);

    return (
        <>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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
                <form className="animate-in flex-1 flex flex-col w-full max-w-xl justify-center gap-2 text-foreground">
                    <p className="place-items-center text-4xl pb-10">Add Group</p>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="groupName"
                        placeholder="Group Name"
                        required
                    />
                    <SubmitButton
                        formAction={(formData) => {
                            const groupName = formData.get("groupName") as string;
                            createGroup(user, groupName).then();
                        }}
                        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 btn btn-primary"
                        pendingText="Adding Group..."
                    >
                        Add Group
                    </SubmitButton>
                </form>
            </div>
        </>
    );
}
