import FormAddUser from "@/Components/form/FormAddUser";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddUser() {
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const { data, setData } = useForm({
        ussername: "",
        email: "",
        password: "",
        role: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user.role || user.role !== "superAdmin") {
            window.location.href = "/notfound";
        }
    }, []);

    const validateForm = () => {
        let isValid = true;
        let newErrors = {
            username: "",
            email: "",
            password: "",
            role: "",
        };

        // Validasi username
        if (!data.ussername) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        // Validasi email
        if (!data.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        // Validasi password
        if (!data.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        // Validasi role
        if (!data.role) {
            newErrors.role = "Role is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const save = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Jangan lanjutkan jika form tidak valid
        }

        try {
            await axios.post("/api/users/", data);
            setSuccess(true);
            window.location.href = "/data/users";
        } catch (error) {
            setSuccess(false);
            toast({
                title: "Error to Add User",
                description:
                    "Username and email cannot be the same as existing data",
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
                    <HeaderEdited text={"Create New User"} />

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="">
                            <h4 className="text-lg font-medium text-gray-900">
                                New User Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Create user profile information and email
                                address.
                            </p>
                        </div>
                        <FormAddUser
                            save={save}
                            errors={errors}
                            setData={setData}
                            handleBack={handleBack}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddUser;
