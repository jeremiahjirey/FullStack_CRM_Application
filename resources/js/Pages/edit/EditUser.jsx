import FormEditUser from "@/Components/form/FormEditUser";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditUser() {
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { data, setData } = useForm({
        ussername: "",
        email: "",
        role: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        ussername: "",
        email: "",
        role: "",
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
    }, [id]);

    const validateForm = () => {
        let isValid = true;
        let tempErrors = {
            ussername: "",
            email: "",
            role: "",
        };

        // Validasi username
        if (!data.ussername) {
            tempErrors.ussername = "Username is required";
            isValid = false;
        }

        // Validasi email
        if (!data.email) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!validateEmail(data.email)) {
            tempErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Validasi role
        if (!data.role) {
            tempErrors.role = "Role is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const save = async (e) => {
        e.preventDefault();

        // Validasi form manual
        if (!validateForm()) return;

        try {
            // Tunggu respons dari server
            await axios.put(`/api/users/${id}`, data);
            setSuccess(true);
            window.location.href = "/data/users";
        } catch (error) {
            console.error(error);
            setSuccess(false);
            toast({
                title: "Failed to edit user",
                description:
                    "Username and email cannot be the same as existing data.",
                variant: "destructive",
            });
        }
    };

    const handleBack = () => {
        window.location.href = "/data/users";
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
                        <FormEditUser
                            save={save}
                            data={data}
                            errors={errors}
                            setData={setData}
                            handleBack={handleBack}
                            togglePasswordVisibility={togglePasswordVisibility}
                            showPassword={showPassword}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditUser;
