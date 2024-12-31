import FormEditEmployee from "@/Components/form/FormEditEmployee";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditEmployes() {
    const [id, setId] = useState(null);
    const [divisions, setDivisions] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredDivisions, setFilteredDivisions] = useState([]);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({}); // State untuk menyimpan error
    const { toast } = useToast();

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
        { key: "email", label: "Email", type: "text" }, // Ubah dari email ke text
        { key: "phone", label: "Phone", type: "number" }, // Ubah dari text ke number
        {
            key: "company_id",
            label: "Company",
            type: "select",
            options: companies,
        },
        {
            key: "division_id",
            label: "Division",
            type: "select",
            options: filteredDivisions,
            disabled: !data.company_id, // Disable jika company belum dipilih
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

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("0");
        setId(userId);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/employees/${id}`);
                    if (response.data.status === false) {
                        window.location.href = "/notfound";
                    }
                    const employeeData = response.data.data;
                    setData({
                        first_name: employeeData.first_name,
                        last_name: employeeData.last_name,
                        email: employeeData.email,
                        phone: employeeData.phone,
                        company_id: employeeData.company_id,
                        division_id: employeeData.division_id,
                    });
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [id]);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await axios.get("/api/divisions");
                setDivisions(response.data.data);
            } catch (error) {
                console.error("Error fetching divisions:", error);
            }
        };

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

    useEffect(() => {
        if (data.company_id) {
            const filtered = divisions.filter(
                (division) => division.company_id === parseInt(data.company_id)
            );
            setFilteredDivisions(filtered);
        } else {
            setFilteredDivisions([]);
        }
    }, [data.company_id, divisions]);

    const validate = () => {
        const newErrors = {};
        if (!data.first_name.trim())
            newErrors.first_name = "First name is required.";
        if (!data.last_name.trim())
            newErrors.last_name = "Last name is required.";
        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!data.phone.trim()) newErrors.phone = "Phone number is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Hentikan jika ada error

        try {
            await axios.put(`/api/employees/${id}`, data);
            setSuccess(true);
            window.location.href = "/data/employees";
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to Edit Employee",
                variant: "destructive",
            });
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
                    <HeaderEdited text={"Employee Edited"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Employee Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Update Employee information.
                            </p>
                        </div>
                        <FormEditEmployee
                            save={save}
                            inputFields={inputFields}
                            setData={setData}
                            errors={errors}
                            data={data}
                            handleBack={handleBack}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditEmployes;
