import React, { useState } from 'react';


// Button that handles leaving a particular group
export default function LeaveButton(props: { className: string, onClick: () => void}) {

    // sets the text to "Leaving..." when the button is clicked
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