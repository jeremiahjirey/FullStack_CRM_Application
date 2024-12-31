import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FormAddCompany from "@/Components/form/FormAddCompany";

function EditCompany() {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

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

    const validate = () => {
        const newErrors = {};
        if (!data.name.trim()) {
            newErrors.name = "Company name is required.";
        }
        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!data.website.trim()) {
            newErrors.website = "Website is required.";
        } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.website)) {
            newErrors.website =
                "Invalid website format. Example: https://example.com";
        }
        if (!data.logo) {
            newErrors.logo = "Logo is required.";
        } else if (data.logo.size > 5 * 1024 * 1024) {
            newErrors.logo = "Logo size must not exceed 5 MB.";
        } else {
            const img = new Image();
            img.src = URL.createObjectURL(data.logo);
            img.onload = () => {
                if (img.width > 500 || img.height > 500) {
                    newErrors.logo = "Logo dimensions must not exceed 500x500.";
                }
            };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("logo", data.logo);
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
            toast({
                title: "Error",
                description: "Failed to add Company",
                variant: "destructive",
            });
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
                        <div>
                            <FormAddCompany
                                save={save}
                                errors={errors}
                                setData={setData}
                                handleBack={handleBack}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditCompany;
