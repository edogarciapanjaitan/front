"use client";

import React from "react";

interface PopupProps {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
}

export default function Popup({
    message,
    type = "success",
    onClose
}: PopupProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center animate-[fadeIn_.3s_ease]">
                <h2
                    className={`text-xl font-semibold ${
                        type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {type === "success" ? "Success" : "Error"}
                </h2>

                <p className="mt-2 text-gray-700">{message}</p>

                <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
}

