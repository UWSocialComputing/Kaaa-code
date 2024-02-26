import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
    // Query backend for user data
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Redirect to login page if user isn't logged in
    if (!user) {
        return redirect("/login");
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

                <div className="pt-96 text-success">
                    <div role="alert" className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-success">Joined Group "{params.slug}"</span>
                    </div>
                </div>
            </div>
        </>
    )
};