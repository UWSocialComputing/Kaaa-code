import React from 'react';

interface SidebarProps {
    /*
    * List of user's groups
    */
    groupList: string[];

    /*
    *
    */
    onGroupPress: (group: string) => void;
}

export default function Sidebar(props: SidebarProps) {
    return (
        <div className="absolute z-10 right-0 h-full w-96 bg-slate-800 opacity-75">
            <p className="pt-11 font-mono text-2xl font-extrabold flex justify-center">
                GROUPS
            </p>
            <ButtonList
                groupList={props.groupList}
                onGroupPress={(group: string) => props.onGroupPress(group)}
            ></ButtonList>
        </div>
    );
}

function ButtonList(props: SidebarProps) {
    const buttons = [];
    for (let i = 0; i < props.groupList.length; i++) {
        buttons.push(<button className="pt-3 font-mono underline text-2xl" onClick={() => props.onGroupPress(props.groupList[i])}>{props.groupList[i]}</button>);
    }
    return <div className="grid justify-items-center">{buttons}</div>;
}