import FormLogin from "@/Components/form/FormLogin";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

export default function Login() {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");

    const { data, setData } = useForm({
        email: "",
        password: "",
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});
        setSuccess(false);

        let tempErrors = {};

        if (!data.email) {
            setEmailError("Email is required.");
            return;
        } else if (!isValidEmail(data.email)) {
            setEmailError("Invalid email format.");
            return;
        }

        if (!data.password) {
            tempErrors.password = "Password is required.";
        }

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }

        try {
            const response = await axios.post("api/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("user", JSON.stringify(response.data.data));

            // Redirect ke dashboard
            window.location.href = "/";
        } catch {
            setSuccess(true);
        }
    };

    return (
        <main className="bg-[#F7F8FA] flex justify-center items-center h-screen w-full">
            <div className="w-[480px] h-auto py-7 px-6 rounded-xl bg-white overflow-hidden">
                <div className="">
                    <FormLogin
                        submit={submit}
                        data={data}
                        setData={setData}
                        errors={errors}
                        togglePasswordVisibility={togglePasswordVisibility}
                        showPassword={showPassword}
                        success={success}
                        emailError={emailError}
                    />
                </div>
            </div>
        </main>
    );
}
