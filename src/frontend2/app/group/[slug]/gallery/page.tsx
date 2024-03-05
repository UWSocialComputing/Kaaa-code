"use client"
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { checkAuth } from "@/app/auth/auth";
import { getAllMosaics } from "@/app/scripts/groups";
import Link from "next/link";



/**
 * Webapp home page
 */
export default function Gallery({ params }: { params: { slug: string } }) {
  // Query backend for user data

  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [mosaics, setMosaics] = useState();

  useEffect(() => {
    let temp = async () => {
      await checkAuth();
      let data = await getAllMosaics(params.slug);

      setTimestamps([...Object.keys(data)].sort().reverse());
      setMosaics(data);
    }

    temp();
  }, []);

  function parseDate(timestamp: string) {
    let date = new Date(parseInt(timestamp));
    return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
  }


  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <Link
        href={`/group/${params.slug}`}
        className="absolute left-80 pl-16 z-50 top-32 py-2 px-4 w-full rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">

        <div className="flex flex-col space-y-10">
          {timestamps.map((timestamp) => {
            if (mosaics[timestamp].svg.replaceAll('<svg class="h-full w-full">',"").replaceAll("</svg>","") === "") {
              return (<></>);
            }
            return (
              <div key={timestamp}>
                <p className="text-2xl font-bold">Prompt: {mosaics[timestamp].prompt}</p>
                <p className="text-lg italic">{parseDate(timestamp)}</p>
                <br />
                <div className="flex flex-wrap w-screen" dangerouslySetInnerHTML={{ __html: mosaics[timestamp].svg }}>
                </div>
              </div>
            )
          }
          )}
        </div>

      </div>
    </div>

  );
}