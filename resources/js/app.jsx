import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "./Components/ui/toaster";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const user = JSON.parse(localStorage.getItem("user"));

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        if (window.location.pathname === "/login" && user) {
            // Jika sudah login, redirect ke halaman yang sesuai (misalnya dashboard)
            window.location.href = "/";
            return;
        }

        // Untuk halaman lain yang memerlukan user login
        if (!user && window.location.pathname !== "/login") {
            // Jika tidak ada user, redirect ke halaman login
            window.location.href = "/login";
            return;
        }

        root.render(
            <main>
                <App {...props} />
                <Toaster />
            </main>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
