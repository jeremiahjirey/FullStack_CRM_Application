import { menuItems } from "@/lib";
import React, { useEffect } from "react";

function Menu() {
    const handleLogout = () => {
        // Menghapus data pengguna dari Local Storage
        localStorage.removeItem("user");

        // Redirect ke halaman login
        window.location.href = "/login";
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    const currentPath = window.location.pathname;

    return (
        <div className="w-full">
            {menuItems.map((item) => (
                <div key={item.title}>
                    <h2 className="text-xl font-semibold mb-4 mt-16">
                        {item.title}
                    </h2>
                    <ul className="space-y-3 ml-4">
                        {item.items.map((subItem) => {
                            if (subItem.visible.includes(role)) {
                                const isActive = currentPath === subItem.href;
                                return (
                                    <li
                                        key={subItem.label}
                                        className={`rounded-md md:px-2 hover:bg-sky ${
                                            isActive ? "bg-sky text-white" : ""
                                        } active:scale-105`}
                                    >
                                        {subItem.label === "Logout" ? (
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center justify-start gap-4 text-gray-500 py-2"
                                            >
                                                <img
                                                    alt=""
                                                    src={subItem.icon}
                                                    className="w-5 h-5"
                                                />
                                                <span>{subItem.label}</span>
                                            </button>
                                        ) : (
                                            <a
                                                href={subItem.href}
                                                className="flex items-center justify-start gap-4 text-gray-500 py-2"
                                            >
                                                <img
                                                    alt=""
                                                    src={subItem.icon}
                                                    className="w-5 h-5"
                                                />
                                                <span>{subItem.label}</span>
                                            </a>
                                        )}
                                    </li>
                                );
                            }
                            return null; // Kembalikan null jika tidak sesuai role
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Menu;
