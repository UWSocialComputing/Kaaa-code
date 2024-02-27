"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

async function getUserGroups(user: string | undefined) {

    const { data, error } = await supabase
        .from('usersgroups')
        .select()
        .filter('user', 'eq', user)

    console.log(data)

    if (error) {
        console.log(error);
    }

    return data;
}

export async function updateUserWithNewGroup(groupId: number, name: string) {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    let currGroups = await getUserGroups(user.email);

    if (!currGroups) {
        return false;
    }

    if (currGroups.length != 0) {

        let ids = currGroups[0].groups;
        let names = currGroups[0].groupNamesAndId;

        ids.push(groupId);
        // js add name -> groupid to object
        names = { ...names, [groupId]: name }
        ids = ids.filter(function(item: any, pos: any) {
            return ids.indexOf(item) == pos;
        })

        const { error } = await supabase
            .from('usersgroups')
            .update({ groups: ids, groupNamesAndId: names })
            .eq('user', user.email)

        if (error) {
            console.log(error);
            return false;
        }
    } else {
        // create the row instead
        const { error } = await supabase
            .from('usersgroups')
            .insert({ user: user.email, groups: [groupId], groupNamesAndId: { [groupId]: name } })
    }
    return true;
}

export async function createGroup(name: string) {

    const defaultOldPrompts = { "prompts": [], "timestamps": [] }
    let timestamp = new Date()
    let currPrompt = "What's on your mind?"

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false
    }

    const { data, error } = await supabase
        .from('groups')
        .insert({ name: name, prompt: currPrompt, old_prompts: defaultOldPrompts, last_prompt_updated: timestamp, owner: user.email })
        .select();

    if (error) {
        console.log(error);
        return false
    }
    updateUserWithNewGroup(data[0].id, name)
    redirect("/addGroup/show/"+data[0].id+"/"+name);
    return true;
}