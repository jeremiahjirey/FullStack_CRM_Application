import React from "react";

function FormAddUser({
    save,
    errors,
    setData,
    handleBack,
    showPassword,
    togglePasswordVisibility,
}) {
    return (
        <form className="flex flex-col gap-8 mt-6" onSubmit={save}>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="ussername"
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl ${
                        errors.username ? "border-red-500" : ""
                    }`}
                    id="ussername"
                    placeholder="Username"
                    onChange={(e) => setData("ussername", e.target.value)}
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.username}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Email Address"
                    className={`w-full rounded-md max-w-xl ${
                        errors.email ? "border-red-500" : ""
                    }`}
                    id="email"
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 relative max-w-xl">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Password"
                    className={`w-full rounded-md ${
                        errors.password ? "border-red-500" : ""
                    }`}
                    id="password"
                    onChange={(e) => setData("password", e.target.value)}
                />
                <span
                    className="absolute right-1 top-[27px] cursor-pointer bg-white p-2 text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    <img
                        src={`/storage/images/${
                            showPassword ? "eye" : "eye-slash"
                        }.svg`}
                        alt={showPassword ? "Hide" : "Show"}
                        className="h-5 w-5"
                    />
                </span>
                {errors.password && (
                    <span className="text-red-500 text-xs mt-1">
                        {errors.password}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                >
                    Role
                </label>
                <select
                    id="role"
                    className={`w-full rounded-md max-w-xl ${
                        errors.role ? "border-red-500" : ""
                    }`}
                    onChange={(e) => setData("role", e.target.value)}
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superAdmin">Super Admin</option>
                </select>
                {errors.role && (
                    <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
            </div>
            <div className="flex gap-5">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default FormAddUser;
