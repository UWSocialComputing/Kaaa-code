"use server"
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

/**
 * Query the database for the user's data for the specified group
 * @param user the logged in user
 * @param group the group to query the data from
 * @returns the user's data for the group
 */
export async function getUserLiveData(user: string, group: number) {
    console.log("group:" + group)
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

/**
 * Update the database with the user's current data for the specified group
 * @param user the logged in usr
 * @param group the group to update the data for
 * @param elements the elements to be updated in the database
 */
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

/**
 * Updates the database with an svg of the current drawing for a user
 * @param user the loggedin user
 * @param group the group to update the svg for
 * @param elements the svg to update the database with
 */
export async function uploadFinal(user: string, group: number, elements: any) {
    const { data, error } = await supabase
        .from('usersgroups')
        .update({ active_drawing_svg: elements })
        .filter('user', 'eq', user)
        .filter('group_id', 'eq', group)

    if (error) {
        console.log(error);
    }
}