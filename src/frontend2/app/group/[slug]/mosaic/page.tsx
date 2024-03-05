"use client"
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { checkAuth } from "@/app/auth/auth";
import { getMosaic } from "@/app/scripts/groups";
import Link from "next/link";



/**
 * Webapp home page
 */
export default function Mosaic({ params }: { params: { slug: string } }) {
  // Query backend for user data

  const [prompt, setPrompt] = useState<string>("No prompts yet! Check back after the prompts are done!");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let temp = async () => {
      await checkAuth();
      let data = await getMosaic(params.slug);

      if (data != null && [...Object.keys(data)].length > 0) {
        setPrompt(data.prompt);
        setSvg(data.svg);

        console.log(data);
      }
    }
    temp();
  }, []);



  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">

        <div className="flex flex-col space-y-2">
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
          <div>
            <p className="text-2xl font-bold">Mosaic</p>
          </div>
          <div>
            <p className="text-xl">Prompt: {prompt}</p>
          </div>
          <div className="flex flex-wrap" dangerouslySetInnerHTML={{ __html: svg }}>
          </div>
        </div>

      </div>
    </div>

  );
}