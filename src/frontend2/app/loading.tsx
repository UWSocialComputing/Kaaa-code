import React from 'react';

/**
 * Loading screen, displayed automatically whenever fetching data
 */
export default async function Loading() {

    return (
        <>
            <div className="pt-96">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        </>
    );
}
