import HeaderEdited from "@/Components/HeaderEdited";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FormEditCompany from "@/Components/form/FormEditCompany";

function EditCompany() {
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

    const { data, setData } = useForm({
        name: "",
        email: "",
        logo: "",
        website: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
            !user?.role || // Penambahan optional chaining
            (user.role !== "superAdmin" && user.role !== "admin")
        ) {
            window.location.href = "/notfound";
        }

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("id");
        setId(userId);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/company/${id}`);
                    const companyData = response.data.data;

                    setData({
                        name: companyData.name,
                        email: companyData.email,
                        logo: "",
                        website: companyData.website,
                    });
                } catch (error) {
                    window.location.href = "/notfound";
                }
            };

            fetchData();
        }
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = "Company name is required.";
        }

        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!data.website.trim()) {
            newErrors.website = "Website is required.";
        } else if (!/^https?:\/\/.+$/.test(data.website)) {
            newErrors.website = "Website must start with http:// or https://.";
        }

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("website", data.website);

        if (e.target.logo.files[0]) {
            formData.append("logo", e.target.logo.files[0]);
        }

        try {
            await axios.post(`/api/company/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            window.location.href = "/data/companyes";
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to edit Division",
                variant: "destructive",
            });
            setSuccess(false);
        }
    };

    const handleBack = () => {
        window.location.href = "/data/companyes";
    };

    const validateLogo = (file) => {
        return new Promise((resolve, reject) => {
            if (file.size > 5 * 1024 * 1024) {
                reject("File size must not exceed 5MB.");
                return;
            }

            const img = new Image();
            img.onload = () => {
                if (img.width > 500 || img.height > 500) {
                    reject("Image dimensions must not exceed 500x500 pixels.");
                } else {
                    resolve();
                }
            };
            img.onerror = () => reject("Invalid image file.");
            img.src = URL.createObjectURL(file);
        });
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            await validateLogo(file);
            setData("logo", file);
            setErrors((prev) => ({ ...prev, logo: null }));
        } catch (error) {
            setErrors((prev) => ({ ...prev, logo: error }));
        }
    };

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text={"Company Edited"} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                Company Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Update Company information.
                            </p>
                        </div>
                        <FormEditCompany
                            save={save}
                            errors={errors}
                            data={data}
                            setData={setData}
                            handleBack={handleBack}
                            handleLogoChange={handleLogoChange}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditCompany;
