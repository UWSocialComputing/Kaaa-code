"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

/**
 * Get all groups belonging to a user
 * @param user the user whose groups are to be queried
 * @returns the user's groups
 */
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

/**
 * Adds the logged in user to a group
 * @param groupId the group to add the logged in user to
 * @returns true if succesful, false otherwise
 */
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

/**
 * Creates a group of a specified name, with a new if, prompt, this date stamp as the last_prompt_updated,
 * and the logged in user as the owner.
 * Adds the logged in user to the group.
 * @param name the name that the group will have
 * @returns true if succesful, false otherwise
 */
export async function createGroup(name: string) {

    const defaultOldPrompts = { "prompts": [], "timestamps": [] }
    let timestamp = new Date()
    let currPrompt = "What's on your mind?"
    let mosaics = {}

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false
    }

    const { data, error } = await supabase
        .from('groups')
        .insert({ name: name, prompt: currPrompt, mosaics, last_prompt_updated: timestamp, owner: user.email })
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
 * Queries backend for group's data
 * @param groupId the ID of the group to be 
 * @returns the data for the specified group
 */
export async function queryGroupData(groupId: string) {
    const {data, error} = await supabase
        .from('groups')
        .select('last_prompt_updated, name')
        .filter('id', 'eq', parseInt(groupId));

    if (error || !data) {
        console.log(error);
        return null;
    }
    const dateLastUpdated = new Date(data[0].last_prompt_updated + 'Z');
    const now = new Date();
    return { timeLeft: 300000 - (now.getTime() - dateLastUpdated.getTime()), groupName: data[0].name };
}

/**
 * Deletes the logged in user from the specified group.
 * If there are no more users in the group, deletes the group.
 * @param groupId the Id of the group to be left
 */
export async function leaveGroup(groupId: string) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    await supabase
        .from('usersgroups')
        .delete()
        .eq('user', user?.email)
        .eq('group_id', groupId);

    const { count } = await supabase
        .from('usersgroups')
        .select('*', { count: 'exact', head: true })
        .eq('group_id', parseInt(groupId));
    console.log(count);

    if (count === 0) {
        await supabase.
            from('groups')
            .delete()
            .eq('id', parseInt(groupId));
    }

    redirect('/dashboard');
}