import { headerTable } from "@/lib";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useToast } from "@/hooks/use-toast";

export function TableUsers() {
    const [dataUsers, setDataUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { toast } = useToast();
    const itemsPerPage = 10;

    const user = JSON.parse(localStorage.getItem("user"));

    // Ambil header tabel
    const headers = headerTable?.tableUsers?.[user?.role] || [];

    // Ambil data dari API
    useEffect(() => {
        (async () => {
            try {
                const users = await axios.get("/api/users");

                setDataUsers(users.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    // Data untuk halaman saat ini
    const currentData = dataUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fungsi untuk menangani perubahan halaman ke halaman berikutnya
    const handleNextPage = () => {
        setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(dataUsers.length / itemsPerPage))
        );
    };

    // Fungsi untuk menangani perubahan halaman ke halaman sebelumnya
    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // Fungsi untuk membuka modal
    const openModal = (user) => {
        setUserToDelete(user);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setUserToDelete(null);
        setIsModalOpen(false);
    };

    // Fungsi untuk menghapus user
    const handleDelete = async () => {
        try {
            // Lakukan request untuk menghapus user berdasarkan ID
            await axios.delete(`/api/users/${userToDelete.id}`);
            // Hapus user dari state dataUsers
            setDataUsers((prev) =>
                prev.filter((u) => u.id !== userToDelete.id)
            );
            toast({
                description: "Succesful Delete User",
                variant: "success",
            });
            closeModal();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Fungsi untuk navigasi ke halaman edit
    const handleEdit = (user) => {
        Inertia.visit(`/data/edit/user`, { data: user.id });
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
                            <td className="px-6 py-4">{item.ussername}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.role}</td>

                            {user.role === "superAdmin" ? (
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
                        Math.ceil(dataUsers.length / itemsPerPage)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold">Konfirmasi Hapus</h2>
                        <p className="my-4">
                            Apakah Anda yakin ingin menghapus{" "}
                            <span className="font-bold">
                                {userToDelete?.ussername}
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
