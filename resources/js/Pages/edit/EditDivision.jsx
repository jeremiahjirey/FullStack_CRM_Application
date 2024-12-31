import FormEditDivision from "@/Components/form/FormEditDivision";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditDivision() {
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

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
                toast({
                    title: "Error",
                    description: "Failed to add Division",
                    variant: "destructive",
                });
            }
        };

        fetchData();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};

        if (!data.name_division.trim()) {
            newErrors.name_division = "Division Name is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Cek validasi

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
                        <FormEditDivision
                            save={save}
                            errors={errors}
                            data={data}
                            setData={setData}
                            companies={companies}
                            handleBack={handleBack}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditDivision;
