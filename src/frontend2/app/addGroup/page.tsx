import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from 'react';

export default async function Dashboard() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // FOR TESTING PURPOSES ONLY
    const submit = async () => {
        "use server"
    }

    return (
        <>
            <div className="pt-20">
                <a href="/dashboard" className="btn btn-ghost">&laquo; back</a>
                <form className="h-screen grid grid-cols-2 gap-x-32 pt-10" action={submit}>
                    <input type="text" placeholder="Group Name" className="input input-bordered input-primary w-full max-w-xs" />
                    <button className="btn btn-primary">Add Group</button>
                </form>
            </div>
        </>
    );
}
