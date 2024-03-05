"use client"
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { checkAuth } from "@/app/auth/auth";
import { getMosaic } from "@/app/scripts/groups";



/**
 * Webapp home page
 */
export default function Mosaic({ params }: { params: { slug: string } }) {
  // Query backend for user data

  const [prompt, setPrompt] = useState<string>("");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let temp = async () => {
      await checkAuth();
      let data = await getMosaic(params.slug);

      setPrompt(data.prompt);
      setSvg(data.svg);

      console.log(data);
    }
    temp();
  }, []);



  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">

        <div className="flex flex-col space-y-2">
          <div>
            <p className="text-2xl font-bold">Mosaic</p>
          </div>
          <div>
            <p className="text-xl">Prompt: {prompt}</p>
          </div>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svg }}>
          </div>
        </div>

      </div>
    </div>

  );
}