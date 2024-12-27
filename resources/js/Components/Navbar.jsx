import React, { useEffect, useState } from "react";
import Menu from "./Menu";

function Navbar() {
    const [open, setOpen] = useState(false);

    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(`/api/users/${user.id}`);
                setInitialData(response.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const redirect = () => {
        window.location.href = "/";
    };

    return (
        <div className="border-b">
            <nav className="flex justify-between fixed w-full z-50 items-center px-6 py-3 bg-white border-gray text-black border-b">
                <div className="flex items-center gap-4 sm:gap-7">
                    <div
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        )}
                    </div>
                    <p
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => redirect()}
                    >
                        CRM Simple
                    </p>
                </div>
                <a href="/user/profile" className=" items-center gap-3 flex">
                    <div className="flex-col hidden sm:flex">
                        <span className="text-[14.5px] leading-3 font-medium">
                            {initialData.ussername}
                        </span>
                        <span className="text-[11px] font-bold text-gray-500 text-right">
                            {initialData.role}
                        </span>
                    </div>
                    <img
                        className="rounded-full h-10 w-10 border-2 border-gray-600 cursor-pointer"
                        src="/storage/images/user.png"
                        alt="profile"
                    />
                </a>
            </nav>
            <div
                className={`fixed top-0 left-0 lg:w-[20%] sm:w-[40%] w-[50%] h-full bg-white shadow-lg px-6 py-4 shadow-custom transition-transform duration-700 z-40 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Menu />
            </div>
        </div>
    );
}

export default Navbar;
