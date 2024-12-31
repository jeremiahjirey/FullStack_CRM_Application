import React, { useState } from "react";

const EditableTable = () => {
    // State untuk menyimpan data tabel
    const [tableData, setTableData] = useState([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
    ]);

    // State untuk menyimpan ID baris yang sedang dalam mode edit
    const [editingRowId, setEditingRowId] = useState(null);

    // Fungsi untuk menangani double-click pada sebuah nama
    const handleDoubleClick = (rowId) => {
        setEditingRowId(rowId);
    };

    // Fungsi untuk menangani perubahan teks pada input
    const handleInputChange = (event, rowId) => {
        const updatedValue = event.target.value;

        // Perbarui data pada tabel sesuai perubahan input
        setTableData((prevTableData) =>
            prevTableData.map((row) =>
                row.id === rowId ? { ...row, name: updatedValue } : row
            )
        );
    };

    // Fungsi untuk keluar dari mode edit saat input kehilangan fokus
    const handleInputBlur = () => {
        setEditingRowId(null); // Kembali ke mode tampilan biasa
    };

    return (
        <table border="1" className="w-full bg-gray-500 border-collapse">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td
                            onDoubleClick={() => handleDoubleClick(row.id)} // Mode edit saat double-click
                            style={{ cursor: "pointer" }}
                        >
                            {editingRowId === row.id ? (
                                // Jika dalam mode edit, tampilkan input
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(event) =>
                                        handleInputChange(event, row.id)
                                    }
                                    onBlur={handleInputBlur} // Keluar dari mode edit saat kehilangan fokus
                                    autoFocus
                                    className="border rounded px-2 py-1"
                                />
                            ) : (
                                // Jika tidak dalam mode edit, tampilkan nama biasa
                                row.name
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EditableTable;
