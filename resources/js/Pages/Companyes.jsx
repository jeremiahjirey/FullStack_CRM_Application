import { Card } from "@/Components/Card";
import Navbar from "@/Components/Navbar";
import { TableCompanyes } from "@/Components/TableCompanyes";
import React, { useEffect, useState } from "react";

function Companyes() {
    const [dataCompanyes, setDataCompanyes] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    // Ambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/company");
                setDataCompanyes(response.data.data || []); // Pastikan data adalah array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Ambil tanggal terakhir diperbarui
    const getLastUpdatedDate = (data) => {
        if (!data || data.length === 0) return "Belum ada data"; // Validasi jika data kosong
        const lastUpdatedCompanye = data[data.length - 1]; // Ambil user terakhir
        if (!lastUpdatedCompanye.updated_at) return "Tanggal tidak tersedia"; // Validasi jika `updated_at` tidak ada
        const formattedDate = new Date(lastUpdatedCompanye.updated_at);
        return formattedDate.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Hitung tanggal terakhir diperbarui
    const DateCompanye = getLastUpdatedDate(dataCompanyes);

    const handleAdd = () => {
        window.location.href = "/add-data/company";
    };

    return (
        <main>
            <Navbar />
            <div className="pt-14 bg-[#F7F8FA] min-h-screen w-full px-5 sm:px-24">
                <div className="flex flex-wrap mt-10 sm:gap-6 gap-4">
                    <Card
                        date={DateCompanye}
                        value={dataCompanyes.length}
                        type="Companyes Data"
                        action="/data/companyes"
                    />
                </div>
                <div className="mt-14">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl">
                            Companyes Data 👤
                        </h1>
                        {user.role === "superAdmin" || user.role === "admin" ? (
                            <button
                                onClick={() => handleAdd()}
                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700  active:bg-green-900"
                            >
                                Create New Companye
                            </button>
                        ) : null}
                    </div>
                    <div className="mt-10 pb-20">
                        <TableCompanyes />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Companyes;
