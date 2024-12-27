import React from "react";

function HeaderEdited({ text }) {
    return (
        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <h1 className="font-semibold text-2xl">{text}</h1>
        </div>
    );
}

export default HeaderEdited;
