import { Inertia } from "@inertiajs/inertia";
import React from "react";

function TableNoMember({
    division,
    currentPage,
    itemsPerPage,
    divisionIndex,
    userRole,
    eventEdit,
    openModal,
}) {
    return (
        <tr key={division.id} className="bg-white border-b">
            {/* Kolom No */}
            <td className="px-6 py-4">
                {(currentPage - 1) * itemsPerPage + divisionIndex + 1}
            </td>
            {/* Kolom Divisi */}
            <td className="px-6 py-4">{division.name_division}</td>

            <td className="px-6 py-4 ">
                {division.company ? (
                    division.company.name
                ) : (
                    <span className="text-center italic text-gray-500">
                        N/A
                    </span>
                )}
            </td>

            {/* Kolom Nama */}
            <td className="px-6 py-4 border-x text-center italic text-gray-500">
                No Members
            </td>
            {/* Kolom Aksi */}
            {(userRole === "superAdmin" || userRole === "admin") && (
                <td className="px-6 py-4">
                    <button
                        onClick={() => eventEdit(division)}
                        className="inline-flex mx-4  my-2  items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700 active:bg-green-900"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => openModal(division)}
                        className="inline-flex items-center my-2 rounded-md border border-transparent bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700 active:bg-red-900"
                    >
                        Delete
                    </button>
                </td>
            )}
        </tr>
    );
}

export default TableNoMember;
