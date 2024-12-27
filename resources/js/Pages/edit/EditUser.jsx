import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditUser() {
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();

    const { data, setData } = useForm({
        ussername: "",
        email: "",
        role: "",
        password: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // Cek apakah user memiliki role yang benar
        if (!user.role || user.role !== "superAdmin") {
            window.location.href = "/login";
        }

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("0");
        setId(userId);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}`);
                    if (response.data.status === false) {
                        window.location.href = "/notfound";
                    }
                    const userData = response.data.data;
                    setData({
                        ussername: userData.ussername,
                        email: userData.email,
                        role: userData.role,
                    });
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData(); // Panggil API
        }
    }, [id]); // Hanya dipanggil saat id berubah

    const save = async (e) => {
        e.preventDefault();
        try {
            // Tunggu respons dari server
            await axios.put(`/api/users/${id}`, data);
            setSuccess(true);
            // window.location.href = "/data/users";
            toast({
                title: "Succesful Edit User",
                variant: "success",
            });
        } catch (error) {
            console.error(error);
            setSuccess(false);
        }
    };

    const handleBack = () => {
        window.location.href = "/data/users"; // Arahkan kembali ke halaman /data/users
    };

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text={"User Edited"} />

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="">
                            <h4 className="text-lg font-medium text-gray-900">
                                User Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Update account's profile information and email
                                address.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
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
                                    className="w-full rounded-md max-w-xl"
                                    id="ussername"
                                    required
                                    value={data.ussername || ""}
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
                                    value={data.email || ""}
                                    className="w-full rounded-md max-w-xl"
                                    id="email"
                                    required
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
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
                                    className="w-full rounded-md max-w-xl"
                                    required
                                    value={data.role || ""}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">
                                        Super Admin
                                    </option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="password"
                                    placeholder="Create New Password for User"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
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
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditUser;
