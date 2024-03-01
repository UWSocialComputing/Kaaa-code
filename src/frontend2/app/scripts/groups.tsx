"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

async function getUserGroups(user: string | undefined) {

    const { data, error } = await supabase
        .from('usersgroups')
        .select()
        .filter('user', 'eq', user)

    if (error) {
        console.log(error);
    }

    return data;
}

export async function updateUserWithNewGroup(groupId: number) {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('usersgroups')
        .insert({ user: user?.email, group_id: groupId, active_drawing_json: {}, active_drawing_svg: ""});

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}

export async function createGroup(name: string) {

    const defaultOldPrompts = { "prompts": [], "timestamps": [] }
    let timestamp = new Date()
    let currPrompt = "What's on your mind?"
    let mosaic = {}

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false
    }

    const { data, error } = await supabase
        .from('groups')
        .insert({ name: name, prompt: currPrompt, mosaic, last_prompt_updated: timestamp, owner: user.email })
        .select();

    if (error) {
        console.log(error);
        return false
    }
    updateUserWithNewGroup(data[0].id)
    redirect("/addGroup/show/" + data[0].id);
    return true;
}

/**
 * Queries backend for group's timestamp
 * @param groupId the ID of the group to be 
 * @returns the timestamp of the group
 */
export async function queryTimestamp(groupId: string) {
    const {data: timestamp, error} = await supabase
        .from('groups')
        .select('last_prompt_updated')
        .filter('id', 'eq', parseInt(groupId));

    if (error) {
        console.log(error);
    }
    
    return timestamp;
}