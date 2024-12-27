import { headerTable } from "@/lib";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function TableEmployees() {
    const [user, setUser] = useState("");
    const [dataEmployee, setDataEmployee] = useState([]);
    const [dataDivision, setDataDivision] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EmpToDelete, setEmpToDelete] = useState(null); // Untuk menyimpan user yang ingin dihapus
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // Ambil header tabel
    const headers = headerTable?.tableEmployees?.[user?.role] || [];

    // Ambil data dari API
    useEffect(() => {
        (async () => {
            try {
                const [employees, divisions, company] = await Promise.all([
                    axios.get("/api/employees"),
                    axios.get("/api/divisions"),
                    axios.get("/api/company"),
                ]);

                setDataEmployee(employees.data.data || []);
                setDataDivision(divisions.data.data || []);
                setDataCompany(company.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    // Fungsi untuk mendapatkan nama perusahaan dan divisi
    const getCompanyName = (id) =>
        dataCompany.find((c) => c.id === id)?.name || "N/A";
    const getDivisionName = (id) =>
        dataDivision.find((d) => d.id === id)?.name_division || "N/A";

    // Data untuk halaman saat ini
    const currentData = dataEmployee.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fungsi untuk menangani perubahan halaman ke halaman berikutnya
    const handleNextPage = () => {
        setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(dataEmployee.length / itemsPerPage))
        );
    };

    // Fungsi untuk menangani perubahan halaman ke halaman sebelumnya
    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // Fungsi untuk membuka modal
    const openModal = (Employees) => {
        setEmpToDelete(Employees);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setEmpToDelete(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            // Lakukan request untuk menghapus user berdasarkan ID
            await axios.delete(`/api/employees/${EmpToDelete.id}`);
            // Hapus user dari state dataUsers
            setDataEmployee((prev) =>
                prev.filter((u) => u.id !== EmpToDelete.id)
            );
            closeModal();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (employe) => {
        Inertia.visit(`/data/edit/employee`, { data: employe.id });
    };

    return (
        <div className="overflow-x-auto">
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
                    {currentData.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:border-gray-700 dark:bg-gray-800"
                        >
                            <td className="px-6 py-4">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-6 py-4">
                                {item.first_name + " " + item.last_name}
                            </td>
                            <td className="px-6 py-4">
                                {getCompanyName(item.company_id)}
                            </td>
                            <td className="px-6 py-4">
                                {getDivisionName(item.division_id)}
                            </td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.phone}</td>
                            {user.role === "superAdmin" ||
                            user.role === "admin" ? (
                                <td className="px-6 py-4 flex gap-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700  active:bg-green-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700  active:bg-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            ) : null}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Tombol Next dan Previous */}
            <div className="flex justify-end items-center mt-4 gap-5">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1} // Tidak bisa ke halaman sebelumnya jika di halaman pertama
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    onClick={handleNextPage}
                    disabled={
                        currentPage >=
                        Math.ceil(dataEmployee.length / itemsPerPage)
                    } // Tidak bisa ke halaman berikutnya jika sudah di halaman terakhir
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold">Konfirmasi Hapus</h2>
                        <p className="my-4">
                            Apakah Anda yakin ingin menghapus{" "}
                            <span className="font-bold">
                                {EmpToDelete?.first_name +
                                    " " +
                                    EmpToDelete?.last_name}
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
