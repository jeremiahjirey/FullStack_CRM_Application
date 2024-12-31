import { Card } from "@/Components/Card";
import Navbar from "@/Components/Navbar";
import { TableEmployees } from "@/Components/TableEmployees";
import React, { useEffect, useState } from "react";

function Employees() {
    const [dataEmployees, setDataEmployees] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    // Ambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/employees");
                setDataEmployees(response.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Ambil tanggal terakhir diperbarui
    const getLastUpdatedDate = (data) => {
        if (!data || data.length === 0) return "Belum ada data";
        const lastUpdatedUser = data[data.length - 1]; // Ambil user terakhir
        if (!lastUpdatedUser.updated_at) return "Tanggal tidak tersedia";
        const formattedDate = new Date(lastUpdatedUser.updated_at);
        return formattedDate.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleAdd = () => {
        window.location.href = "/add-data/employee";
    };

    // Hitung tanggal terakhir diperbarui
    const DateEmployees = getLastUpdatedDate(dataEmployees);
    return (
        <main>
            <Navbar />
            <div className="pt-14 bg-[#F7F8FA] min-h-screen w-full px-5 sm:px-24">
                <div className="flex flex-wrap mt-10 sm:gap-6 gap-4">
                    <Card
                        date={DateEmployees}
                        value={dataEmployees.length} // Pastikan menggunakan panjang array
                        type="Employees"
                        action="/data/employees"
                    />
                </div>
                <div className="mt-14">
                    <div className=" flex justify-between">
                        <h1 className="font-bold text-2xl">
                            Employees Data 🧑‍💻
                        </h1>
                        {user.role === "superAdmin" || user.role === "admin" ? (
                            <button
                                onClick={() => handleAdd()}
                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-2 sm:px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700  active:bg-green-900"
                            >
                                Add Employees
                            </button>
                        ) : null}
                    </div>

                    <div className="mt-10 pb-20">
                        <TableEmployees />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Employees;
