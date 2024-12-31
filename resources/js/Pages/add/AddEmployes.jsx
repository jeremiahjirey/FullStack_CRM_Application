import FormAddEmployee from "@/Components/form/FormAddEmployee";
import HeaderEdited from "@/Components/HeaderEdited";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

function AddEmployees() {
    const [divisions, setDivisions] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredDivisions, setFilteredDivisions] = useState([]);
    const [errors, setErrors] = useState({}); // Error state
    const { toast } = useToast();

    const { data, setData } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_id: "",
        division_id: "",
    });

    const inputFields = [
        { key: "first_name", label: "First Name", type: "text" },
        { key: "last_name", label: "Last Name", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone", type: "number" },
        {
            key: "company_id",
            label: "Company",
            type: "select",
            options: companies,
        },
        {
            key: "division_id",
            label: "Division",
            type: "select",
            options: filteredDivisions,
        },
    ];

    // Handle redirection if user is not authorized
    useEffect(() => {
        const checkUserRole = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (
                !user?.role ||
                (user.role !== "superAdmin" && user.role !== "admin")
            ) {
                window.location.href = "/notfound";
            }
        };
        checkUserRole();
    }, []);

    // Fetch data for divisions and companies
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [divisionsResponse, companiesResponse] =
                    await Promise.all([
                        axios.get("/api/divisions"),
                        axios.get("/api/company"),
                    ]);
                setDivisions(divisionsResponse.data.data);
                setCompanies(companiesResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleCompanyChange = (e) => {
        const selectedCompanyId = e.target.value;
        setData("company_id", selectedCompanyId);

        const filtered = divisions.filter(
            (division) => division.company_id === parseInt(selectedCompanyId) // mengubah dari input string menajdi integer
        );
        setFilteredDivisions(selectedCompanyId ? filtered : []);

        setData("division_id", ""); // Reset division_id
    };

    const validate = () => {
        const newErrors = {};

        if (!data.first_name.trim())
            newErrors.first_name = "First name is required.";
        if (!data.last_name.trim())
            newErrors.last_name = "Last name is required.";

        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!data.phone.trim()) newErrors.phone = "Phone number is required.";
        if (!data.company_id)
            newErrors.company_id = "Company selection is required.";
        if (!data.division_id)
            newErrors.division_id = "Division selection is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const save = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post("/api/employees/", data);
            window.location.href = "/data/employees";
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add Employee",
                variant: "destructive",
            });
        }
    };

    const handleBack = () => (window.location.href = "/data/employees");

    return (
        <main className="bg-[#F7F8FA] min-h-screen w-full">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <HeaderEdited text="Create New Employee" />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">
                                New Employee Information
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                Create new Employee information.
                            </p>
                        </div>
                        <FormAddEmployee
                            save={save}
                            inputFields={inputFields}
                            data={data}
                            errors={errors}
                            setData={setData}
                            handleBack={handleBack}
                            handleCompanyChange={handleCompanyChange}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddEmployees;
