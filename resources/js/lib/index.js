export const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/storage/images/home.png",
                label: "Dashboard",
                href: "/",
                visible: ["superAdmin", "admin", "user"],
            },
            {
                icon: "/storage/images/users.png",
                label: "Users",
                href: "/data/users",
                visible: ["admin", "superAdmin"],
            },
            {
                icon: "/storage/images/employee.png",
                label: "Employees",
                href: "/data/employees",
                visible: ["admin", "superAdmin", "user"],
            },
            {
                icon: "/storage/images/division.png",
                label: "Divisions",
                href: "/data/divisions",
                visible: ["admin", "superAdmin", "user"],
            },
            {
                icon: "/storage/images/company.svg",
                label: "Companyes",
                href: "/data/companyes",
                visible: ["admin", "superAdmin", "user"],
            },

            {
                icon: "/storage/images/profile.png",
                label: "Profile",
                href: "/user/profile",
                visible: ["admin", "superAdmin", "user"],
            },
            {
                icon: "/storage/images/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "superAdmin", "user"],
            },
        ],
    },
];

export const headerTable = {
    tableUsers: {
        superAdmin: ["No", "User Name", "Email", "Role", "Action"],
        admin: ["No", "User Name", "Email", "Role"],
    },
    tableEmployees: {
        superAdmin: [
            "No",
            "Name",
            "Company",
            "Division",
            "Email",
            "Phone",
            "Action",
        ],
        admin: [
            "No",
            "Name",
            "Company",
            "Division",
            "Email",
            "Phone",
            "Action",
        ],
        user: ["No", "Name", "Company", "Division", "Email", "Phone"],
    },
    tableCompany: {
        superAdmin: [
            "No",
            "Company Name",
            "Logo",
            "Email",
            "Website",
            "Action",
        ],
        admin: ["No", "Company Name", "Logo", "Email", "Website", "Action"],
        user: ["No", "Company Name", "Logo", "Email", "Website", "Action"],
    },
    tableDivision: {
        superAdmin: ["No", "Division Name", "Company", "Member", "Action"],
        admin: ["No", "Division Name", "Company", "Member", "Action"],
        user: ["No", "Division Name", "Company", "Member"],
    },
};

export const DataEmployeeEdit = ["First Name", "Last Name", "Email", "Phone"];
