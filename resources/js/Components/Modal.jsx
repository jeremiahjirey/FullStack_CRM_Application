import React from "react";

function Modal(data, table) {
    const [userToDelete, setUserToDelete] = useState(null); // Untuk menyimpan user yang ingin dihapus

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
            closeModal();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold">Konfirmasi Hapus</h2>
                <p className="my-4">
                    Apakah Anda yakin ingin menghapus{" "}
                    <span className="font-bold">{userToDelete?.ussername}</span>
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
    );
}

export default Modal;
