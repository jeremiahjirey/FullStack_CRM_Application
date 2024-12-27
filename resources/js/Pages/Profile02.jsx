import HeaderEdited from "@/Components/HeaderEdited";
import Navbar from "@/Components/Navbar";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile02() {
    const { data, setData } = useForm({
        ussername: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                setLoading(false);

                const response = await axios.get(`/api/users/${user.id}`);
                setInitialData(response.data.data);
                setData({
                    ussername: response.data.data.ussername || "",
                    email: response.data.data.email || "",
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                console.error("User not found in localStorage");
                return;
            }

            await axios.put(`/api/users/${user.id}`, data); // Update data user
            setSuccess(true);
            window.location.href = "/user/profile"; // Redirect setelah berhasil
        } catch (error) {
            console.error("Error updating user:", error);
            setSuccess(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading saat data belum selesai di-fetch
    }

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <Navbar />
            <div className="pt-24 pb-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited
                        text={`Hello, ${initialData.ussername || "User"} 👋👋`}
                    />

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Profile Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your account's profile information and
                                email address.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
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
                                    onChange={(e) =>
                                        setData("ussername", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
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
                </div>
            </div>
            <div className="pb-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Update Password
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Ensure your account is using a long, random
                                password to stay secure.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="current_passsword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="current_passsword"
                                    required
                                    placeholder="Current Passsword"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="current_passsword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="current_passsword"
                                    required
                                    placeholder="New Password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
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
                                    className="w-full rounded-md max-w-xl"
                                    id="current_passsword"
                                    required
                                    placeholder="Confirm New Password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
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
                </div>
            </div>
        </main>
    );
}

export default Profile02;
