import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddDivision() {
    const [success, setSuccess] = useState(false);

    const { data, setData } = useForm({
        name_division: "", // Nama key sesuai API
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
            !user?.role || // Penambahan optional chaining
            (user.role !== "superAdmin" && user.role !== "admin")
        ) {
            window.location.href = "/notfound";
        }
    }, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/divisions/`, data);
            setSuccess(true);
            window.location.href = "/data/divisions";
        } catch (error) {
            console.error("Error updating division data:", error);
            setSuccess(false);
        }
    };

    const handleBack = () => {
        window.location.href = "/data/divisions";
    };

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text={"Create New Division"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Division Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Create New Division information.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name_division"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Division Name
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="name_division"
                                    placeholder="Division Name"
                                    required
                                    onChange={(e) =>
                                        setData("name_division", e.target.value)
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

export default AddDivision;
