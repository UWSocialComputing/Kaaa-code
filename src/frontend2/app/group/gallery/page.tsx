import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from 'react';



/**
 * Webapp home page
 */
export default async function Gallery({params}: {params: {slug: string}}) {


  return (

    <div className="w-screen flex flex-col mt-20 place-items-center justify-center">
      <div className="w-full max-w-3xl flex justify-between items-center p-3 text-sm mt-20">


      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p className="text-2xl font-bold center">Gallery</p>
      </div>


      </div>
    </div>

  );
}