import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';
import Link from "next/link";
import { SubmitButton } from "../login/submit-button";

/**
 * Add group screen
 */
export default async function Dashboard() {
    // Query backend for user data
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Redirect to login page if user isn't logged in
    if (!user) {
        return redirect("/login");
    }

    // FOR TESTING PURPOSES ONLY
    const submit = async (formData : FormData) => {
        "use server"

        const groupName = formData.get("groupName") as string;
        redirect("/"+groupName);
    }

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
                        formAction={submit}
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
