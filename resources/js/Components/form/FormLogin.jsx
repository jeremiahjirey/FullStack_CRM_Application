import React from "react";

function FormLogin({
    submit,
    data,
    setData,
    errors,
    togglePasswordVisibility,
    showPassword,
    success,
    emailError,
}) {
    return (
        <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="flex flex-col">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    value={data.email}
                    className={`w-full rounded-md max-w-xl h-12 ${
                        emailError ? "border-red-500" : ""
                    }`}
                    id="email"
                    onChange={(e) => setData("email", e.target.value)}
                />
                {emailError && (
                    <span className="text-red-500 text-sm mt-1">
                        {emailError}
                    </span>
                )}
            </div>
            <div className="flex flex-col mt-4 relative">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    value={data.password}
                    className={`w-full rounded-md max-w-xl h-12 pr-10 ${
                        errors.password ? "border-red-500" : ""
                    }`}
                    id="password"
                    onChange={(e) => setData("password", e.target.value)}
                />
                <span
                    className="absolute right-3 top-[33px] cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <img
                            src="/storage/images/eye.svg"
                            className="h-5 w-5"
                            alt="Show"
                        />
                    ) : (
                        <img
                            src="/storage/images/eye-slash.svg"
                            className="h-5 w-5"
                            alt="Hide"
                        />
                    )}
                </span>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )}
            </div>
            {success && (
                <p className="text-red-700 text-sm mt-2 p-2 bg-red-300 w-full rounded-md flex justify-center items-center">
                    Email or Password is wrong
                </p>
            )}
            <button
                type="submit"
                className="flex items-center mt-5 justify-center rounded-md border border-transparent bg-gray-800 px-4 py-4 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2"
            >
                Log In
            </button>
        </form>
    );
}

export default FormLogin;
