import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

/**
 * Sign in/ sign out button
 * @returns the html for the login and logout button, depending on auth status of user
 */
export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <div className="border border-primary hover:skeleton">
              <div className="">
                <p className="text-sm">Hey, {user.email}!</p>
              </div>
            </div>
          </li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/addGroup">Add Group</a></li>
          <form action={signOut} >
            <li>
              <button className="w-full h-full">
                Logout
              </button>
            </li>
          </form>
        </ul>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="btn btn-primary py-2 px-3 flex rounded-md no-underline hover:ring ring-primary ring-offset-2"
    >
      Login
    </Link>
  );
}
