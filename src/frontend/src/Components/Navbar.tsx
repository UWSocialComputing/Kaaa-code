import React from 'react';

interface NavbarProps {
    /*
    * Triggered when the user clicks the home icon on the navbar.
    */
    onClickHome: () => void;

    /*
    * Triggered when the user clicks the sidebar icon on the navbar.
    */
    onClickSidebar: () => void;

    /*
    * Name of the current group the user is in. If no group is selected, empty string.
    */
   currentGroup: string;
}

export default function Navbar(props: NavbarProps) {
    return (
        <div className="flex pt-1 pb-1 pl-1 bg-teal-500 w-full h-10">
            <button className="bg-transparent hover:bg-slate-800 rounded-full px-2 py-1" onClick={() => props.onClickHome()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                    <path fill-rule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clip-rule="evenodd" />
                </svg>
            </button>
            <p className="pl-5 italic font-mono text-2xl font-extrabold">
                KAAA&#129413;&#129413;&#129413;
            </p>
            <button className="bg-transparent hover:bg-slate-800 rounded-full px-2 py-1 absolute right-1" onClick={() => props.onClickSidebar()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    );
}