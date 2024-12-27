import React from "react";

function FormUpdateUser({ saveUpdate, data, setData }) {
    return (
        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <div>
                <h4 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </div>
            <form className="flex flex-col gap-8 mt-6" onSubmit={saveUpdate}>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        autoComplete="off"
                        className="w-full rounded-md max-w-xl"
                        id="username"
                        value={data.ussername || ""}
                        required
                        placeholder="Username"
                        onChange={(e) => setData("ussername", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        autoComplete="off"
                        placeholder="Email Address"
                        className="w-full rounded-md max-w-xl"
                        id="email"
                        value={data.email || ""}
                        required
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </div>

                <div className="flex gap-5">
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormUpdateUser;
