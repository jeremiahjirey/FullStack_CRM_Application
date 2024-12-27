import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

export default function Login() {
    const { data, setData } = useForm({
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        try {
            // Tunggu respons dari server
            const response = await axios.post("api/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("user", JSON.stringify(response.data.data));

            // Redirect ke dashboard
            window.location.href = "/";
        } catch {
            setSuccess(true);
        }
    };

    return (
        <main className="bg-[#F7F8FA] flex justify-center items-center h-screen w-full">
            <div className="w-[480px] h-auto py-7 px-6 rounded-xl bg-white overflow-hidden">
                <div className="">
                    <form onSubmit={submit} className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete="off"
                                value={data.email}
                                className="w-full rounded-md max-w-xl h-12"
                                id="email"
                                required
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                value={data.password}
                                className="w-full rounded-md max-w-xl h-12"
                                id="password"
                                required
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <div className="h-10 w-full mt-3">
                                {success && (
                                    <p className="text-red-700 text-sm mt-2 p-2 bg-red-300 w-full rounded-md flex justify-center items-center">
                                        Email or Password is wrong
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="flex items-center mt-5 justify-center rounded-md border border-transparent bg-gray-800 px-4 py-4 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
