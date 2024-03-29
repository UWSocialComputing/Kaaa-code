// @ts-nocheck
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
export async function updateUserWithNewGroup(user: string, groupId: number) {

    const { data, error } = await supabase
        .from('usersgroups')
        .insert({ user: user, group_id: groupId, active_drawing_json: {}, active_drawing_svg: "" });

    if (error) {
        console.log(error);
        return error.code;
    }

    return 0;
}

/**
 * Creates a group of a specified name, with a new if, prompt, this date stamp as the last_prompt_updated,
 * and the logged in user as the owner.
 * Adds the logged in user to the group.
 * @param name the name that the group will have
 * @returns true if succesful, false otherwise
 */
export async function createGroup(user: string, name: string) {

    let timestamp = (new Date()).getTime()
    let numPrompts = Object.keys(Prompts).length
    let currPrompt = Prompts[Math.floor(Math.random() * numPrompts)]
    let mosaic = {}

    const { data, error } = await supabase
        .from('groups')
        .insert({ name: name, prompt: currPrompt, mosaic, last_prompt_updated: timestamp, owner: user })
        .select();

    if (error) {
        console.log(error);
        return false
    }
    console.log('here')
    updateUserWithNewGroup(user, data[0].id)
    redirect("/addGroup/show/" + data[0].id);
    return true;
}

/**
 * Queries backend for group's data
 * @param groupId the ID of the group to be 
 * @returns the data for the specified group
 */
export async function queryGroupData(groupId: string) {
    const { data, error } = await supabase
        .from('groups')
        .select('last_prompt_updated, name, prompt')
        .filter('id', 'eq', parseInt(groupId));

    if (error || !data) {
        console.log(error);
        return null;
    }
    return { timeLeft: 300000 - ((new Date()).getTime() - parseInt(data[0].last_prompt_updated)), groupName: data[0].name, prompt: data[0].prompt };
}

/**
 * Deletes the logged in user from the specified group.
 * If there are no more users in the group, deletes the group.
 * @param groupId the Id of the group to be left
 */
export async function leaveGroup(user: string, groupId: string) {
    await supabase
        .from('usersgroups')
        .delete()
        .eq('user', user)
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

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Updates the group's mosaic
 * @param groupId the id of the group whose mosaic is being updated
 * @param timestamp the time that the last prompt was given
 */
export async function updateMosaic(groupId: string, timestamp: number, currentPrompt: string) {
    const { data, error } = await supabase
        .from('usersgroups')
        .select('active_drawing_svg')
        .eq('group_id', parseInt(groupId));
    const svgs = data;

    if (error) {
        console.log(error);
    } else if (svgs) {
        const strs: string[] = [];
        svgs.forEach(datum => {
            strs.push('<svg viewBox="0 0 60 55" preserveAspectRatio="xMidYMin slice"style="width: 100%; padding-bottom: 23%; height: 1px; overflow: visible">' + datum.active_drawing_svg.toString() + '</svg>');
        })
        const svgString = strs.join("");
        const storageObject = { prompt: currentPrompt, svg: svgString };

        const { data, error } = await supabase
            .from('groups')
            .select('mosaic')
            .eq('id', parseInt(groupId));
        console.log('mosaic' + data![0].mosaic.toString());
        const jsonData = data ? data[0].mosaic : {};
        jsonData[timestamp] = storageObject;

        if (error) {
            console.log(error);
        }

        await supabase
            .from('groups')
            .update({ mosaic: jsonData })
            .eq('id', groupId);
        
        await supabase
            .from('usersgroups')
            .update({ active_drawing_json: {}, active_drawing_svg: "" })
            .eq('group_id', parseInt(groupId));
    }
}

/**
 * Updates the prompt for the group.
 * Supabase doesn't offer transactions so this doesn't deal with race conditions.
 * @param groupId the id of the group whose prompt is to be updates
 * @returns The new time left, the new prompt
 */
export async function updatePrompt(user: string, groupId: string, currentPrompt: string) {
    console.log("updatePrompt")
    const numPrompts = Object.keys(Prompts).length;
    let nextPrompt = Math.floor(Math.random() * numPrompts);
    while (Prompts[nextPrompt] === currentPrompt) {
        nextPrompt = Math.floor(Math.random() * numPrompts)
    }
    const timestamp = (new Date()).getTime();

    const { data, error } = await supabase
        .from('groups')
        .update({ prompt: Prompts[nextPrompt], last_prompt_updated: timestamp })
        .eq('id', parseInt(groupId))
        .lte('last_prompt_updated', timestamp - 300000)
        .select('last_prompt_updated, prompt');


    if (data.length == 0) {
        const { data, error } = await supabase
            .from('groups')
            .select('last_prompt_updated, prompt')
            .eq('id', parseInt(groupId));

        if (!data || error) {
            console.log(error);
            return null;
        }

        return { timeLeft: 300000 - ((new Date()).getTime() - parseInt(data[0].last_prompt_updated)), prompt: data[0].prompt };
    } 

    // Need to update mosaic too if this is the first person to update the prompt
    await updateMosaic(groupId, timestamp, currentPrompt);

    const { } = await supabase
        .from('usersgroups')
        .update({ active_drawing_json: {}, active_drawing_svg: "" })
        .eq('group_id', parseInt(groupId));

    if (!data || error) {
        console.log(error);
        return null;
    }

    return { timeLeft: 300000 - ((new Date()).getTime() - parseInt(data[0].last_prompt_updated)), prompt: data[0].prompt };
}

/**
 * Gets the current mosaic for the given group id
 * @param groupId The group to fetch the mosaic for
 * @returns the latest prompt and all asscoiated SVG's for the group
 */
export async function getMosaic(groupId: string) {
    const { data } = await supabase
        .from('groups')
        .select('mosaic')
        .filter('id', 'eq', parseInt(groupId));

    // get the latest timestamp
    const latest = Math.max(...Object.keys(data[0].mosaic));
    return (data[0].mosaic[latest]);
}

/**
 * Gets all the mosaics for the given group id as
 * a dictionary mapping timestamps to prompt and SVG
 * @param groupId The group to fetch the mosaics for
 * @returns A dictionary of timestamps to prompt and SVG
 */
export async function getAllMosaics(groupId: string) {
    const { data } = await supabase
        .from('groups')
        .select('mosaic')
        .filter('id', 'eq', parseInt(groupId));

    // get the latest timestamp
    return (data[0].mosaic);
}