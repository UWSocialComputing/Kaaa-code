"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Checks the login status of the user. Redirects to the login page if they are not logged in.
 * @returns the email of the logged in user
 */
export async function checkAuth() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return user.email;
}