import React from 'react';

interface HomePageProps {
    /*
    * List of user's groups
    */
    groupList: string[];

    /*
    * List of user's friends
    */
    friendList: string[];

    /*
    * Triggered when a user clicks on a group
    */
    onGroupPress: (group: string) => void;
}

/**
 * @returns Represents the home page for the app
 */
export default function HomePage(props: HomePageProps) {
    return (
        <div className="grid grid-cols-2">
            <div className="h-5/6 flex flex-col">
                <p className="justify-center flex font-mono font-extrabold text-8xl">
                  GROUPS  
                </p>
                <HomePageList
                    list={props.groupList}
                    onButtonPress={props.onGroupPress}
                ></HomePageList>
            </div>
        </div>
    );
}

interface HomePageListProps {
    /*
    * List of strings to be used in buttons
    */
    list: string[];

    /*
    * Triggered when a user clicks on a button
    */
    onButtonPress: (group: string) => void;
}

/**
 * @returns List of buttons, one for in the input strings list
 */
function HomePageList(props: HomePageListProps) {
    const buttons = [];
    for (let i = 0; i < props.list.length; i++) {
        buttons.push(<button className="font-mono text-4xl" onClick={() => props.onButtonPress(props.list[i])}>{props.list[i]}</button>);
    }
    return <div className="pt-1 grid justify-items-center overflow-y-auto flex flex-1">{buttons}</div>;
}