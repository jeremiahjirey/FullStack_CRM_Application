import { Card } from "@/Components/Card";
import Navbar from "@/Components/Navbar";
import { TableUsers } from "@/Components/TableUsers";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [dataUsers, setDataUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role !== "admin" && user.role !== "superAdmin") {
        window.location.href = "/notfound";
    }

    // Ambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users");
                setDataUsers(response.data.data || []); // Pastikan data adalah array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Ambil tanggal terakhir diperbarui
    const getLastUpdatedDate = (data) => {
        if (!data || data.length === 0) return "Belum ada data"; // Validasi jika data kosong
        const lastUpdatedUser = data[data.length - 1]; // Ambil user terakhir
        if (!lastUpdatedUser.updated_at) return "Tanggal tidak tersedia"; // Validasi jika `updated_at` tidak ada
        const formattedDate = new Date(lastUpdatedUser.updated_at);
        return formattedDate.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Hitung tanggal terakhir diperbarui
    const DateUsers = getLastUpdatedDate(dataUsers);

    const handleAdd = () => {
        window.location.href = "/add-data/user";
    };

    return (
        <main>
            <Navbar />
            <div className="pt-14 bg-[#F7F8FA] min-h-screen w-full px-5 sm:px-24">
                <div className="flex flex-wrap mt-10 sm:gap-6 gap-4">
                    <Card
                        date={DateUsers}
                        value={dataUsers.length} // Pastikan menggunakan panjang array
                        type="User"
                        action="/data/users"
                    />
                </div>
                <div className="mt-14">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl">Users Data 👤</h1>
                        {user.role === "superAdmin" ? (
                            <button
                                onClick={() => handleAdd()}
                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700  active:bg-green-900"
                            >
                                Create New User
                            </button>
                        ) : null}
                    </div>

                    <div className="mt-10 pb-20">
                        <TableUsers />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Users;
