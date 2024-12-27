import React from "react";

function FormUpdatePassword({
    updatePass,
    passwordError,
    setPassword,
    confirmPasswordError,
    setNewPassword,
    setConfirmPassword,
    confirmPassword,
    newPassword,
    password,
}) {
    return (
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <div>
                    <h4 className="text-lg font-medium text-gray-900">
                        Update Password
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                        Ensure your account is using a long, random password to
                        stay secure.
                    </p>
                </div>
                <form
                    className="flex flex-col gap-8 mt-6"
                    onSubmit={updatePass}
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="passsword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            className={`w-full rounded-md max-w-xl ${
                                passwordError ? "border-red-500" : ""
                            }`}
                            id="passsword"
                            value={password}
                            required
                            placeholder="Current Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <span className="text-sm text-red-500">
                                {passwordError}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="new_passsword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            className={`w-full rounded-md max-w-xl ${
                                confirmPasswordError ? "border-red-500" : ""
                            }`}
                            id="new_passsword"
                            value={newPassword}
                            required
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="current_passsword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            className={`w-full rounded-md max-w-xl ${
                                confirmPasswordError ? "border-red-500" : ""
                            }`}
                            value={confirmPassword}
                            id="current_passsword"
                            required
                            placeholder="Confirm New Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && (
                            <span className="text-sm text-red-500">
                                {confirmPasswordError}
                            </span>
                        )}
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
        </div>
    );
}

export default FormUpdatePassword;
