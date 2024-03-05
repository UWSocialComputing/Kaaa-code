// @ts-nocheck
"use client"
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { checkAuth } from "@/app/auth/auth";
import { getAllMosaics } from "@/app/scripts/groups";



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

      console.log(data);


    }

    temp();
  }, []);

  function parseDate(timestamp: string) {
    let date = new Date(parseInt(timestamp));
    return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
  }


  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">

        <div className="flex flex-col space-y-10">
          {timestamps.map((timestamp) => {
            return (
              <div key={timestamp}>
                <p className="text-2xl font-bold">Prompt: {mosaics[timestamp].prompt}</p>
                <p className="text-lg italic">{parseDate(timestamp)}</p>
                <br />
                <div className="flex flex-row" dangerouslySetInnerHTML={{ __html: mosaics[timestamp].svg }}>
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