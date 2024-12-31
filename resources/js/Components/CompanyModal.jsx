import React, { useEffect, useState } from "react";
import axios from "axios";

export function CompanyModal({ companyId, onClose }) {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [divisionCount, setDivisionCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch company data
                const companyResponse = await axios.get(
                    `/api/company/${companyId}`
                );
                setCompanyDetails(companyResponse.data.data);

                // Fetch divisions and employees
                const [divisionsResponse, employeesResponse] =
                    await Promise.all([
                        axios.get("/api/divisions"),
                        axios.get("/api/employees"),
                    ]);

                const divisions = divisionsResponse.data.data.filter(
                    (div) => div.company_id === companyId
                );
                const employees = employeesResponse.data.data.filter(
                    (emp) => emp.company_id === companyId
                );

                setDivisionCount(divisions.length);
                setEmployeeCount(employees.length);
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        };

        fetchDetails();
    }, [companyId]);

    if (!companyDetails) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-7 text-center">
                    Company Information
                </h2>
                <div className="my-4 flex gap-3 min-h-44 min-w-[470px]">
                    <div className="w-1/3 flex items-center justify-center">
                        <img
                            src={`/storage/logos/${companyDetails.logo}`}
                            alt="Company Logo"
                            className="w-full mb-4 rounded-lg"
                        />
                    </div>

                    <div className="w-2/3 flex items-cente justify-center">
                        <table className="">
                            <tr>
                                <td className="font-bold pr-3">Name</td>
                                <td>: {companyDetails.name}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-3">Email</td>
                                <td>: {companyDetails.email}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-3">
                                    Division Total
                                </td>
                                <td>: {divisionCount}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-3">
                                    Employee Total
                                </td>
                                <td>: {employeeCount}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-3">Website</td>
                                <td>
                                    :{" "}
                                    <a href={companyDetails.website}>
                                        {companyDetails.website}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
