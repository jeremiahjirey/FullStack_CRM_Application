import HeaderEdited from "@/Components/HeaderEdited";
import Navbar from "@/Components/Navbar";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FormUpdateUser from "@/Components/form/FormUpdateUser";
import FormUpdatePassword from "@/Components/form/FormUpdatePassword";
import { useToast } from "@/hooks/use-toast";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState(""); // Current password
    const [newPassword, setNewPassword] = useState(""); // New password
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password
    const [passwordError, setPasswordError] = useState(""); // Error untuk password
    const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error untuk confirm password
    const [error, setError] = useState("");
    const [initialData, setInitialData] = useState([]);
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const togglePasswordVisibility = (field) => {
        if (field === "current") setShowPassword(!showPassword);
        if (field === "new") setShowNewPassword(!showNewPassword);
        if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
    };

    const { data, setData } = useForm({
        ussername: "",
        email: "",
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                setLoading(false);

                const response = await axios.get(`/api/users/${user.id}`);
                setInitialData(response.data.data);
                setData({
                    ussername: response.data.data.ussername || "",
                    email: response.data.data.email || "",
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const save = async (e) => {
        e.preventDefault();

        // Reset error state
        setUsernameError("");
        setEmailError("");

        if (!data.ussername) {
            setUsernameError("Username cannot be empty.");
            return;
        }
        if (!data.email) {
            setEmailError("Email cannot be empty.");
            return;
        } else if (!isValidEmail(data.email)) {
            setEmailError("Invalid email format.");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                console.error("User not found in localStorage");
                return;
            }

            await axios.put(`/api/users/${user.id}`, data); // Update data user
            setSuccess(true);
            window.location.href = "/user/profile"; // Redirect setelah berhasil
        } catch (error) {
            console.error("Error updating user:", error);
            setSuccess(false);
        }
    };

    const updatePass = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setConfirmPasswordError("");
        setError("");

        if (!password) {
            setPasswordError("Correct password must required.");
            return;
        }

        if (!newPassword | !confirmPassword) {
            setConfirmPasswordError("New password must required.");
            return;
        } else if ((newPassword.length < 8) | (confirmPassword.length < 8)) {
            setConfirmPasswordError(
                "The new password must be at least 8 characters."
            );
            return;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError(
                "New password and confirm password do not match."
            );
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                console.error("User not found in localStorage");
                return;
            }

            await axios.post(`/api/check/${user.id}`, {
                password,
            });

            const updatePassword = await axios.put(
                `/api/update-pass/${user.id}`,
                {
                    password: newPassword,
                }
            );

            setPassword("");
            setNewPassword("");
            setConfirmPassword("");

            if (updatePassword.status === 200) {
                toast({
                    title: "Update Password",
                    description: "Succesful Update password",
                    variant: "success",
                });
            }
        } catch (error) {
            setError("Failed to update password.");
            if (error.status === 401) {
                setPasswordError("Password is incorrect.");
                return;
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <Navbar />
            <div className="pt-24 pb-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited
                        text={`Hello, ${initialData.ussername || "User"} 👋👋`}
                    />
                    <FormUpdateUser
                        saveUpdate={save}
                        data={data}
                        setData={setData}
                        usernameError={usernameError}
                        emailError={emailError}
                    />
                </div>
            </div>
            <div className="pb-6">
                <FormUpdatePassword
                    updatePass={updatePass}
                    passwordError={passwordError}
                    setPassword={setPassword}
                    confirmPasswordError={confirmPasswordError}
                    setNewPassword={setNewPassword}
                    setConfirmPassword={setConfirmPassword}
                    confirmPassword={confirmPassword}
                    newPassword={newPassword}
                    password={password}
                    showPassword={showPassword}
                    showNewPassword={showNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            </div>
        </main>
    );
}

export default Profile;
