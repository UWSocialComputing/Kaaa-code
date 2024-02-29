import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from 'react';

/**
 * Webapp home page
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

  // Query backend for user's group data
  const { data: groups } = await supabase
    .from('usersgroups')
    .select('group_id, name: groups(name)')
    .filter('user', 'eq', user.email);

  console.log(groups);

  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">
        <p className="text-2xl font-bold">Your groups</p>
        <a href="/addGroup" className="btn btn-primary btn-md hover:ring ring-primary ring-offset-2">
          Add
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-5 grid-rows-4 gap-y-6 gap-4 mt-10">
        {groups.length == 0 ? <p className="col-span-5 text-center">Uh oh! Looks like you have no groups with your friends <a href="/addGroup" className="btn text-neutral btn-link">Add one?</a></p> : Array.from({ length: groups.length }, (_, index) => (
          <>
            <a key={groups[index].group_id} href={"./group/" + groups[index].group_id} className="text-xl pt-3.5 w-full rounded-lg ring hover:ring-offset-2 ring-primary ring-offset-0 hover:bg-primary/[.5] p-2 text-xl text-center h-14">{groups[index].name.name}</a>
          </>
        ))}
      </div>
    </div>

  );
}