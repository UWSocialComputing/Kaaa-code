import React from 'react';

interface SidebarProps {
    /*
    * List of user's groups
    */
    groupList: string[];

    /*
    * Triggered when a user clicks on a group
    */
    onGroupPress: (group: string) => void;
}

/**
 * @returns The side menu for the app, with a list of groups for the user to click on, and a logout button
 */
export default function Sidebar(props: SidebarProps) {
    return (
        <div className="absolute z-10 right-0 h-screen flex flex-col w-96 bg-slate-800 opacity-75">
            <p className="pt-2 font-mono text-5xl font-extrabold flex justify-center">
                GROUPS
            </p>
            <ButtonList
                groupList={props.groupList}
                onGroupPress={(group: string) => props.onGroupPress(group)}
            ></ButtonList>
        </div>
    );
}

/**
 * @returns  List of buttons, one for each group the user is a part of
 */
function ButtonList(props: SidebarProps) {
    const buttons = [];
    for (let i = 0; i < props.groupList.length; i++) {
        buttons.push(<button className="pt-3 font-mono underline text-4xl" onClick={() => props.onGroupPress(props.groupList[i])}>{props.groupList[i]}</button>);
    }
    return <div className="grid justify-items-center overflow-y-auto flex flex-1">{buttons}</div>;
}