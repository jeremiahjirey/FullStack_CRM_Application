import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormEditCompany({
    save,
    errors,
    data,
    setData,
    handleBack,
    handleLogoChange,
}) {
    return (
        <form className="flex flex-col gap-8 mt-6" onSubmit={save}>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Company Name
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    id="name"
                    value={data.name || ""}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="logo">Logo</Label>
                <Input
                    id="logo"
                    type="file"
                    className={`w-full rounded-md max-w-xl border ${
                        errors.logo ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleLogoChange}
                />
                {errors.logo && (
                    <p className="text-red-500 text-sm">{errors.logo}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="email_division"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    id="email_division"
                    value={data.email || ""}
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700"
                >
                    Website
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl border ${
                        errors.website ? "border-red-500" : "border-gray-300"
                    }`}
                    id="website"
                    value={data.website || ""}
                    onChange={(e) => setData("website", e.target.value)}
                />
                {errors.website && (
                    <p className="text-red-500 text-sm">{errors.website}</p>
                )}
            </div>
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
    );
}

export default FormEditCompany;
