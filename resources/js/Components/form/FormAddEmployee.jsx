import React from "react";

function FormAddEmployee({
    save,
    inputFields,
    data,
    errors,
    setData,
    handleBack,
    handleCompanyChange,
}) {
    return (
        <form className="flex flex-col gap-8 mt-6" onSubmit={save}>
            {inputFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                    <label
                        htmlFor={field.key}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {field.label}
                    </label>
                    {field.type === "text" || field.type === "number" ? (
                        <input
                            id={field.key}
                            type={field.type}
                            autoComplete="off"
                            value={data[field.key]}
                            onChange={(e) => setData(field.key, e.target.value)}
                            className={`w-full rounded-md max-w-xl ${
                                errors[field.key] ? "border-red-500" : ""
                            }`}
                        />
                    ) : field.key === "company_id" ? (
                        <select
                            id={field.key}
                            value={data.company_id}
                            onChange={handleCompanyChange}
                            className={`w-full rounded-md max-w-xl ${
                                errors[field.key] ? "border-red-500" : ""
                            }`}
                        >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            id={field.key}
                            value={data.division_id}
                            onChange={(e) => setData(field.key, e.target.value)}
                            className={`w-full rounded-md max-w-xl ${
                                errors[field.key] ? "border-red-500" : ""
                            }`}
                            disabled={!data.company_id}
                        >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name_division}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors[field.key] && (
                        <span className="text-red-500 text-sm">
                            {errors[field.key]}
                        </span>
                    )}
                </div>
            ))}
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

export default FormAddEmployee;
