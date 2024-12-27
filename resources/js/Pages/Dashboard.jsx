import { Card } from "@/Components/Card";
import Navbar from "@/Components/Navbar";
import { SkeletonCard } from "@/Components/Skeleton";
import { TableEmployees } from "@/Components/TableEmployees";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataEmployee, setDataEmployee] = useState([]);
    const [dataDivision, setDataDivision] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null > null);

    const fetchData = async () => {
        try {
            const users = axios.get("/api/users");
            const employees = axios.get("/api/employees");
            const divisions = axios.get("/api/divisions");
            const company = axios.get("/api/company");

            // Tunggu semua request selesai
            const responses = await Promise.all([
                users,
                employees,
                divisions,
                company,
            ]);

            setDataUsers(responses[0].data);
            setDataEmployee(responses[1].data);
            setDataDivision(responses[2].data);
            setDataCompany(responses[3].data);
        } catch (error) {
            setError("Gagal memuat data. Silakan coba lagi.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading false setelah data diambil atau error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA] w-full">
                <Navbar />
                <div className="flex flex-wrap px-5 sm:px-24 mt-10 sm:gap-6 gap-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#F7F8FA] w-full">
                <Navbar />
                <div className="flex flex-wrap px-5 sm:px-24 mt-10 sm:gap-6 gap-4">
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const getLastUpdatedDate = (data) => {
        const rawDate = data.data[data.data.length - 1]?.updated_at;
        const formattedDate = new Date(rawDate);
        return formattedDate.toLocaleString("id-ID");
    };

    // Mengambil dan memformat data dari setiap dataset
    const DateEmployee = getLastUpdatedDate(dataEmployee);
    const DateDivision = getLastUpdatedDate(dataDivision);
    const DateCompany = getLastUpdatedDate(dataCompany);
    const DateUser = getLastUpdatedDate(dataUsers);

    const renderCards = () => {
        if (user.role !== "superAdmin" && user.role !== "admin") {
            return (
                <div className="flex flex-wrap px-5 sm:px-24 mt-10 sm:gap-6 gap-4">
                    <Card
                        date={DateEmployee}
                        value={dataEmployee.data.length}
                        type="Employee"
                        action="/data/employees"
                    />
                    <Card
                        date={DateDivision}
                        value={dataDivision.data.length}
                        type="Division"
                        action="/data/divisions"
                    />
                    <Card
                        date={DateCompany}
                        value={dataCompany.data.length}
                        type="Company"
                        action="/data/companyes"
                    />
                </div>
            );
        } else {
            return (
                <div className="flex flex-wrap px-5 sm:px-24 mt-10 sm:gap-6 gap-4">
                    <Card
                        date={DateUser}
                        value={dataUsers.data.length}
                        type="User"
                        action="/data/users"
                    />
                    <Card
                        date={DateEmployee}
                        value={dataEmployee.data.length}
                        type="Employee"
                        action="/data/employees"
                    />
                    <Card
                        date={DateDivision}
                        value={dataDivision.data.length}
                        type="Division"
                        action="/data/divisions"
                    />
                    <Card
                        date={DateCompany}
                        value={dataCompany.data.length}
                        type="Company"
                        action="/data/companyes"
                    />
                </div>
            );
        }
    };

    return (
        <main>
            <Navbar />
            <div className="min-h-screen pt-12 bg-[#F7F8FA] w-full">
                <div>{renderCards()}</div>
                <div className="px-5 sm:px-24 mt-14">
                    <h1 className="font-bold text-2xl">Employees Data</h1>
                    <div className="mt-10 pb-20">
                        <TableEmployees />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
