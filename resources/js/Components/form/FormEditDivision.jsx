import React from "react";

function FormEditDivision({
    save,
    errors,
    data,
    setData,
    companies,
    handleBack,
}) {
    return (
        <form className="flex flex-col gap-8 mt-6" onSubmit={save}>
            {/* Input untuk Nama Divisi */}
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name_division"
                    className="block text-sm font-medium text-gray-700"
                >
                    Division Name
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl ${
                        errors.name_division ? "border-red-500" : ""
                    }`}
                    id="name_division"
                    value={data.name_division || ""}
                    onChange={(e) => setData("name_division", e.target.value)}
                />
                {errors.name_division && (
                    <p className="text-sm text-red-500">
                        {errors.name_division}
                    </p>
                )}
            </div>
            {/* Dropdown untuk Nama Perusahaan */}
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="company_name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Company Name
                </label>
                <select
                    type="text"
                    autoComplete="off"
                    className="w-full rounded-md max-w-xl"
                    id="company_name"
                    value={data.company_id || ""}
                    onChange={(e) => setData("company_id", e.target.value)}
                >
                    <option value="">Select Company</option>
                    {companies.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Tombol Aksi */}
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

export default FormEditDivision;
