"use client";

import { useEffect } from "react";
import { requireAdmin } from "@/utils/auth";

export default function AdminPage() {
    useEffect(() => {
        if (requireAdmin()) {
            // Redirect ke dashboard jika sudah admin
            window.location.href = "/admin/dashboard";
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Redirecting...</p>
        </div>
    );
}




