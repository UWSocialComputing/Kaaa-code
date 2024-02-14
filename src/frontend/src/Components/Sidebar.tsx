import React from 'react';

interface SidebarProps {
}

export default function SideBar() {
    return (
        <div className="absolute z-10 right-0 h-full w-96 bg-slate-800 opacity-75">
            <p className="pt-11 font-mono text-2xl font-extrabold flex justify-center">
                GROUPS
            </p>
        </div>
    );
}