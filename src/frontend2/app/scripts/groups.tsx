"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Prompts } from "./prompts";
import { timeStamp } from "console";

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

    let timestamp = new Date()
    let numPrompts = Object.keys(Prompts).length
    let currPrompt = Prompts[Math.floor(Math.random() * numPrompts)]
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
    console.log('here')
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
        .select('last_prompt_updated, name, prompt')
        .filter('id', 'eq', parseInt(groupId));

    if (error || !data) {
        console.log(error);
        return null;
    }
    const dateLastUpdated = new Date(data[0].last_prompt_updated + 'Z');
    const now = new Date();
    return { timeLeft: 300000 - (now.getTime() - dateLastUpdated.getTime()), groupName: data[0].name, prompt: data[0].prompt };
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

/**
 * Updates the prompt for the group. Handles race conditions by waiting
 * Supabase doesn't offer transactions so this is an imperfect solution
 * @param groupId the id of the group whose prompt is to be updates
 * @returns The new time left, the new prompt
 */
export async function updatePrompt(groupId: string) {
    const numPrompts = Object.keys(Prompts).length;
    const nextPrompt = Math.floor(Math.random() * numPrompts);
    const timestamp = new Date();
    const lastUpdated = new Date(timestamp.getTime() - 300000);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('usersgroups')
        .select('user')
        .eq('group_id', parseInt(groupId))
        .order('user', { ascending: true });

    if (error) {
        console.log(error);
        return null;
    }
    const users = data;

    if (user && users) {
        // Iterate through group member array. If this user is the current, update, otherwise wait, and see if the current member updated
        for (let i = 0; i < users.length; i++) {
            if (user.email === users[i].user) {
                const { data, error } = await supabase
                    .from('groups')
                    .update({ prompt: Prompts[nextPrompt], last_prompt_updated: timestamp })
                    .eq('id', parseInt(groupId))
                    .eq('owner', user.email)
                    .select('last_prompt_updated, prompt');
            
                if (!data || error) {
                    console.log(error);
                    return null;
                }
            
                return { timeLeft: 300000 - ((new Date()).getTime() - (new Date(data[0].last_prompt_updated + 'Z')).getTime()), prompt: data[0].prompt };
            } else {
                setTimeout(() => {}, 5000); // Wait for 5 seconds to see if data is updated by current user in queue
                const { data } = await supabase
                    .from('groups')
                    .select('last_prompt_updated, prompt')
                    .eq('id', parseInt(groupId));

                if (!data || error) {
                    console.log(error);
                    return null;
                }

                if ((new Date(data[0].last_prompt_updated + 'Z')).getTime() > lastUpdated.getTime()) {
                    return { timeLeft: 300000 - ((new Date()).getTime() - (new Date(data[0].last_prompt_updated + 'Z')).getTime()), prompt: data[0].prompt };
                }
            }
        }
    }
    
    return null;
}