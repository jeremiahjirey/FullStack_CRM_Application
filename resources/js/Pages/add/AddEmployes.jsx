import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddEmployes() {
    const [divisions, setDivisions] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [success, setSuccess] = useState(false);

    const { data, setData } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_id: "",
        division_id: "",
    });

    const inputFields = [
        { key: "first_name", label: "First Name", type: "text" },
        { key: "last_name", label: "Last Name", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "text" },
        {
            key: "company_id",
            label: "Company",
            type: "select",
            options: companies, // gunakan data dari state
        },
        {
            key: "division_id",
            label: "Division",
            type: "select",
            options: divisions, // gunakan data dari state
        },
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (
            !user.role ||
            (user.role !== "superAdmin" && user.role !== "admin")
        ) {
            window.location.href = "/notfound";
        }
    }, []);

    useEffect(() => {
        // Fetch data divisions
        const fetchDivisions = async () => {
            try {
                const response = await axios.get("/api/divisions");
                setDivisions(response.data.data);
            } catch (error) {
                console.error("Error fetching divisions:", error);
            }
        };

        // Fetch data companies
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("/api/company");
                setCompanies(response.data.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchDivisions();
        fetchCompanies();
    }, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/employees/`, data);
            setSuccess(true);
            window.location.href = "/data/employees";
        } catch (error) {
            console.error(error);
            setSuccess(false);
        }
    };

    const handleBack = () => {
        window.location.href = "/data/employees";
    };

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text={"Create New Employee"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                New Employee Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Create new Employee information.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={save}
                        >
                            {inputFields.map((field) => (
                                <div
                                    key={field.key}
                                    className="flex flex-col gap-1"
                                >
                                    <label
                                        htmlFor={field.key}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {field.label}
                                    </label>
                                    {field.type === "text" ||
                                    field.type === "email" ? (
                                        <input
                                            id={field.key}
                                            type={field.type}
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    field.key,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md max-w-xl"
                                            required
                                        />
                                    ) : (
                                        <select
                                            id={field.key}
                                            onChange={(e) =>
                                                setData(
                                                    field.key,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md max-w-xl"
                                            required
                                        >
                                            <option value="">
                                                Select {field.label}
                                            </option>
                                            {field.options.map((option) => (
                                                <option
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name ||
                                                        option.name_division}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
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

export default AddEmployes;
