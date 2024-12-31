import FormAddDivision from "@/Components/form/FormAddDivision";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddDivision() {
    const [success, setSuccess] = useState(false);
    const [dataCompany, setDataCompany] = useState([]);
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

    const { data, setData } = useForm({
        name_division: "",
        company_id: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (
                !user?.role || // Penambahan optional chaining
                (user.role !== "superAdmin" && user.role !== "admin")
            ) {
                window.location.href = "/notfound";
                return;
            }

            try {
                const response = await axios.get(`/api/company`);
                setDataCompany(response.data.data || []); // Ambil data dari response
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!data.name_division)
            newErrors.name_division = "Division name is required.";
        if (!data.company_id)
            newErrors.company_id = "Company name is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(`/api/divisions/`, data);
            setSuccess(true);
            window.location.href = "/data/divisions";
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add Division",
                variant: "destructive",
            });
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
                        <FormAddDivision
                            save={save}
                            errors={errors}
                            setData={setData}
                            dataCompany={dataCompany}
                            handleBack={handleBack}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddDivision;
