"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

export async function getUserLiveData(user: string, group: number) {
    const { data, error } = await supabase
        .from('usersgroups')
        .select()
        .filter('user', 'eq', user)
        .filter('group_id', 'eq', group)

    if (error) {
        console.log(error);
    }

    return data[0];
}

export async function uploadLive(user: string, group: number, elements: any) {
    const { data, error } = await supabase
        .from('usersgroups')
        .update({ active_drawing_json: { elements: elements } })
        .filter('user', 'eq', user)
        .filter('group_id', 'eq', group)

    if (error) {
        console.log(error);
    }
}