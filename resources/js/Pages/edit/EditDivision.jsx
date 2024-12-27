import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditDivision() {
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [companies, setCompanies] = useState([]);

    const { data, setData } = useForm({
        name_division: "",
        company_id: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (
            !user?.role ||
            (user.role !== "superAdmin" && user.role !== "admin")
        ) {
            window.location.href = "/notfound";
        }

        // Ambil ID dari query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("0");
        setId(userId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/divisions/${id}`);
                    const divisionData = response.data.data;

                    setData({
                        name_division: divisionData.name_division,
                        company_id: divisionData.company_id || "",
                    });
                } catch (error) {
                    console.error("Error fetching division data:", error);
                }
            }

            try {
                // Ambil daftar perusahaan
                const response = await axios.get("/api/company");
                setCompanies(response.data.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchData();
    }, [id]);

    const save = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/divisions/${id}`, data);
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
                    <HeaderEdited text={"Division Edited"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Division Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Update Division information.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
                            {/* Input untuk Nama Divisi */}
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
                                    required
                                    value={data.name_division || ""}
                                    onChange={(e) =>
                                        setData("name_division", e.target.value)
                                    }
                                />
                            </div>
                            {/* Dropdown untuk Nama Perusahaan */}
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="company_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Company Name
                                </label>
                                <select
                                    type="text"
                                    autoComplete="off"
                                    className="w-full rounded-md max-w-xl"
                                    id="company_name"
                                    value={data.company_id || ""}
                                    onChange={(e) =>
                                        setData("company_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Tombol Aksi */}
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

export default EditDivision;
