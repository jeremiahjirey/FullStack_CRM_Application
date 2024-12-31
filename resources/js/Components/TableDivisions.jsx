import { headerTable } from "@/lib";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import React, { useState, useEffect } from "react";
import TableNoMember from "./TableNoMember";
import { useToast } from "@/hooks/use-toast";

export function TableDivisions() {
    const [dataDivision, setDataDivision] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [divToDelete, setDivToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { toast } = useToast();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Ambil header tabel
    const headers = headerTable?.tableDivision?.[user?.role] || [];

    // Ambil data dari API dan gabungkan employees dengan divisions dan companies
    useEffect(() => {
        (async () => {
            try {
                const [employeesResponse, divisionsResponse, companyResponse] =
                    await Promise.all([
                        axios.get("/api/employees"),
                        axios.get("/api/divisions"),
                        axios.get("/api/company"),
                    ]);

                const employees = employeesResponse.data.data || [];
                const divisions = divisionsResponse.data.data || [];
                const companies = companyResponse.data.data || [];

                // Gabungkan data employees dengan division dan company
                const groupedData = divisions.map((division) => {
                    const company = companies.find(
                        (comp) => comp.id === division.company_id
                    );

                    return {
                        ...division,
                        employees: employees.filter(
                            (employee) => employee.division_id === division.id
                        ),
                        company: company, // Menyimpan data perusahaan
                    };
                });

                setDataDivision(groupedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    // Data untuk halaman saat ini
    const currentData = dataDivision.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fungsi untuk menangani perubahan halaman
    const handleNextPage = () => {
        setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(dataDivision.length / itemsPerPage))
        );
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // Fungsi untuk membuka modal
    const openModal = (division) => {
        setDivToDelete(division);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setDivToDelete(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/divisions/${divToDelete.id}`);
            setDataDivision((prev) =>
                prev.filter((division) => division.id !== divToDelete.id)
            );
            toast({
                title: "Succesful Delete Division",
                variant: "success",
            });
            closeModal();
        } catch (error) {
            console.error("Error deleting division:", error);
        }
    };

    const handleEdit = (item) => {
        Inertia.visit(`/data/edit/division`, { data: item.id });
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-yellow">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {currentData.map((division, divisionIndex) => {
                        // Jika divisi tidak memiliki anggota
                        if (division.employees.length === 0) {
                            return (
                                <TableNoMember
                                    key={division.id}
                                    userRole={user.role}
                                    division={division}
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    divisionIndex={divisionIndex}
                                    eventEdit={handleEdit}
                                    openModal={openModal}
                                />
                            );
                        }

                        // Jika divisi memiliki anggota
                        return division.employees.map(
                            (employee, employeeIndex) => (
                                <tr
                                    key={employee.id}
                                    className="bg-white border-b"
                                >
                                    {/* Kolom No */}
                                    {employeeIndex === 0 && (
                                        <td
                                            rowSpan={division.employees.length}
                                            className="px-6 py-4"
                                        >
                                            {(currentPage - 1) * itemsPerPage +
                                                divisionIndex +
                                                1}
                                        </td>
                                    )}

                                    {/* Kolom Divisi */}
                                    {employeeIndex === 0 && (
                                        <td
                                            rowSpan={division.employees.length}
                                            className="px-6 py-4"
                                        >
                                            {division.name_division}
                                        </td>
                                    )}

                                    {/* Kolom Company Divisi */}
                                    {employeeIndex === 0 && (
                                        <td
                                            rowSpan={division.employees.length}
                                            className="px-6 py-4"
                                        >
                                            {division.company ? (
                                                division.company.name
                                            ) : (
                                                <span className="text-center italic text-gray-500">
                                                    N/A
                                                </span>
                                            )}
                                        </td>
                                    )}

                                    {/* Kolom Nama */}
                                    <td className="px-6 py-4 border-x">
                                        {employee.first_name}{" "}
                                        {employee.last_name}
                                    </td>

                                    {(user.role === "superAdmin" ||
                                        user.role === "admin") &&
                                        employeeIndex === 0 && (
                                            <td
                                                rowSpan={
                                                    division.employees.length
                                                }
                                                className="px-6 py-4"
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleEdit(division)
                                                    }
                                                    className="inline-flex mx-4 my-2 items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700 active:bg-green-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(division)
                                                    }
                                                    className="inline-flex items-center my-2 rounded-md border border-transparent bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700 active:bg-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                </tr>
                            )
                        );
                    })}
                </tbody>
            </table>
            {/* Tombol Next dan Previous */}
            <div className="flex justify-end items-center mt-4 gap-5">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    onClick={handleNextPage}
                    disabled={
                        currentPage >=
                        Math.ceil(dataDivision.length / itemsPerPage)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal Hapus */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold">Konfirmasi Hapus</h2>
                        <p className="my-4">
                            Apakah Anda yakin ingin menghapus{" "}
                            <span className="font-bold">
                                {divToDelete?.name_division}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
