import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditCompany() {
    const [success, setSuccess] = useState(false);

    const { data, setData } = useForm({
        name: "",
        logo: "",
        email: "",
        website: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
            !user?.role ||
            (user.role !== "superAdmin" && user.role !== "admin")
        ) {
            window.location.href = "/notfound";
        }
    }, []);

    const save = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("logo", e.target.logo.files[0]);
        formData.append("email", data.email);
        formData.append("website", data.website);

        try {
            await axios.post("/api/company/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            window.location.href = "/data/companyes";
        } catch (error) {
            console.error("Error updating company data:", error);
            setSuccess(false);
        }
    };

    const handleBack = () => {
        window.location.href = "/data/companyes";
    };

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text={"Create New Company"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                New Company Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Create Company information.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="name"
                                    required
                                    placeholder="Company Name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    required
                                    className="w-full rounded-md max-w-xl border-black"
                                    onChange={(e) =>
                                        setData("logo", e.target.files[0])
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
                                    type="text"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    placeholder="Email Address"
                                    id="email"
                                    required
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="website"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Website
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="website"
                                    required
                                    placeholder="Website Company"
                                    onChange={(e) =>
                                        setData("website", e.target.value)
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

export default EditCompany;
