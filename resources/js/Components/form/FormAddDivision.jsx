import React from "react";

function FormAddDivision({ save, errors, setData, dataCompany, handleBack }) {
    return (
        <form className="flex flex-col gap-8 mt-6" onSubmit={save}>
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
                    placeholder="Division Name"
                    onChange={(e) => setData("name_division", e.target.value)}
                />
                {errors.name_division && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.name_division}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name_company"
                    className="block text-sm font-medium text-gray-700"
                >
                    Company Name
                </label>
                <select
                    autoComplete="off"
                    className={`w-full rounded-md max-w-xl ${
                        errors.company_id ? "border-red-500" : ""
                    }`}
                    id="name_company"
                    onChange={(e) => setData("company_id", e.target.value)}
                >
                    <option value="">Select Company</option>
                    {dataCompany.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                {errors.company_id && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.company_id}
                    </p>
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

export default FormAddDivision;
