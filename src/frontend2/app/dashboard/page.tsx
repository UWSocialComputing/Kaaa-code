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

  const { data: [groups] } = await supabase
  .from('usersgroups')
  .select('*')
  .filter('user', 'eq', user.email)

  let groupIds = groups.groups
  let groupIdsWithName = groups.groupNamesAndId;
  let namesToId = new Map();

  groupIds.forEach(element => {
    namesToId.set(groupIdsWithName[element], element);
  });

  let groupList = Array.from(namesToId.keys());
  console.log(groupList);

  const { data: [friends] } = await supabase
  .from('friends')
  .select('*')
  .filter('user', 'eq', user.email)

  let friendList = []
  if (friends) {
    friendList = friends.allFriends.friends;
  }

  // FOR TESTING PURPOSES ONLY

  return (
    <div className="h-screen grid grid-cols-2 gap-x-32 pt-10">
      <div className="py-10 flex flex-col hidden lg:flex min-w-56 overflow-y-hidden">
        <div className="flex flex-row justify-between">
          <p className="justify-center flex font-extrabold text-3xl">
            Groups
          </p>
          <span className="justify-center pt-2">
            <a className="rounded-lg hover:bg-primary btn btn-primary btn-ghost hover:btn-primary btn-xs" href="/addgroup">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </a>
          </span>
        </div>
        <br />
        <div className="pt-1 grid justify-items-center overflow-y-auto space-y-2">
          { groupList.length == 0 ? <p>no groups :(</p> : Array.from({ length: groupList.length }, (_, index) => (
            <button className="text-4xl w-full border-2 border-gray-300 rounded-xl hover:bg-primary h-14">{groupList[index]}</button>
          ))}
        </div>
      </div>

      <div className="py-10 flex flex-col hidden lg:flex min-w-56 overflow-y-hidden">
        <div className="flex flex-row justify-between">
          <p className="justify-center flex font-extrabold text-3xl">
            Friends
          </p>
          <span className="justify-center pt-2">
            <a className="rounded-lg hover:bg-primary btn btn-primary btn-ghost hover:btn-primary btn-xs" href="/addFriend">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </a>
          </span>
        </div>
        <br />
        <div className="pt-1 grid justify-items-center overflow-y-auto space-y-2">
          { friendList.length == 0 ? <p>no frens :(</p> : Array.from({ length: friendList.length }, (_, index) => (
            <button className="text-xl w-full border-2 border-gray-300 rounded-xl hover:bg-primary h-14">{friendList[index]}</button>
          ))}
        </div>
      </div>
    </div>
  );


  // return (
  //   <div className="flex-1 w-full flex flex-col gap-20 items-center">
  //     <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
  //       <Header />
  //       <main className="flex-1 flex flex-col gap-6">
  //         <h2 className="font-bold text-4xl mb-4">Next steps</h2>
  //         <FetchDataSteps />
  //       </main>
  //     </div>

  //     <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
  //       <p>
  //         Powered by{" "}
  //         <a
  //           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
  //           target="_blank"
  //           className="font-bold hover:underline"
  //           rel="noreferrer"
  //         >
  //           Supabase
  //         </a>
  //       </p>
  //     </footer>
  //   </div>
  // );
}
