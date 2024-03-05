import React, { useState } from 'react';

export default function LeaveButton(props: { className: string, onClick: () => void}) {
    const [isLeaving, setIsLeaving] = useState<boolean>(false);

    return (
        <button 
            onClick={() => {
                setIsLeaving(true);
                props.onClick();
            }}
            className={props.className}>
                {isLeaving ? 'Leaving...' : 'Leave Group'}
        </button>
    )
}