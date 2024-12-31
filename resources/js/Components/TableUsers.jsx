import { headerTable } from "@/lib";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useToast } from "@/hooks/use-toast";
import DeletedUserModal from "./ModalDeleteUser";

export function TableUsers() {
    const [dataUsers, setDataUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editingRowId, setEditingRowId] = useState(null);
    const [editingValue, setEditingValue] = useState(""); // Menyimpan nilai saat edit
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

    // Fungsi untuk menangani double-click pada sebuah username
    const handleDoubleClick = (row) => {
        setEditingRowId(row.id); // Masuk ke mode edit untuk baris tertentu
        setEditingValue(row.ussername); // Set nilai awal untuk input
    };

    // Fungsi untuk menangani perubahan teks pada input
    const handleInputChange = (event) => {
        setEditingValue(event.target.value); // Perbarui nilai input
    };

    // untuk menyimpan perubahan saat menekan Enter
    const handleInputKeyDown = async (event, rowId, email) => {
        if (event.key === "Enter") {
            try {
                // Kirim data ke API
                await axios.put(`/api/users/${rowId}`, {
                    ussername: editingValue,
                    email: email,
                });

                // Perbarui dataUsers di state
                setDataUsers((prevData) =>
                    prevData.map((row) =>
                        row.id === rowId
                            ? { ...row, ussername: editingValue }
                            : row
                    )
                );

                toast({
                    title: "Success",
                    description: "Username updated successfully.",
                    variant: "success",
                });

                setEditingRowId(null); // Keluar dari mode edit
            } catch (error) {
                console.error("Error updating username:", error);
                toast({
                    title: "Failed to edit username",
                    description: "Username cannot be the same as existing data",
                    variant: "destructive",
                });
            }
        }
    };

    // Fungsi untuk keluar dari mode edit saat input kehilangan fokus
    const handleInputBlur = () => {
        setEditingRowId(null); // Keluar dari mode edit
    };

    // Data untuk halaman saat ini
    const currentData = dataUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
            await axios.delete(`/api/users/${userToDelete.id}`);
            setDataUsers((prev) =>
                prev.filter((u) => u.id !== userToDelete.id)
            );
            toast({
                title: "Deleted User",
                description: "Successfully deleted user.",
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
                            {/* Kolom username */}
                            <td
                                onDoubleClick={() => handleDoubleClick(item)}
                                style={{ cursor: "pointer" }}
                                className="px-6 py-4"
                            >
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={editingValue}
                                        onChange={handleInputChange}
                                        onKeyDown={(event) =>
                                            handleInputKeyDown(
                                                event,
                                                item.id,
                                                item.email
                                            )
                                        }
                                        onBlur={handleInputBlur}
                                        autoFocus
                                        className="border rounded px-2 py-1"
                                    />
                                ) : (
                                    item.ussername
                                )}
                            </td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.role}</td>
                            {user.role === "superAdmin" && (
                                <td className="px-6 py-4 flex gap-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700 active:bg-green-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700 active:bg-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center mt-4 gap-5">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(
                                prev + 1,
                                Math.ceil(dataUsers.length / itemsPerPage)
                            )
                        )
                    }
                    disabled={
                        currentPage >=
                        Math.ceil(dataUsers.length / itemsPerPage)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            {isModalOpen && (
                <DeletedUserModal
                    userToDelete={userToDelete}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}
