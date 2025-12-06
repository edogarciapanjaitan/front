"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getToken } from "@/utils/auth";

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    cover_img: string;
    date: string;
    createdAt: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = getToken();

            if (!token) {
                setError("Silakan login terlebih dahulu untuk melihat events");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:8000/api/event", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!res.ok) {
                throw new Error("Gagal mengambil data events");
            }

            const result = await res.json();
            setEvents(result.data || []);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching events:", err);
            setError(err.message || "Terjadi kesalahan saat mengambil data events");
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-600 text-xl mb-4">{error}</p>
                    {error.includes("login") && (
                        <Link
                            href="/login"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">All Events</h1>
                    <p className="text-gray-600">Jelajahi semua event yang tersedia</p>
                </header>

                {/* Search Bar */}
                <div className="mb-8 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-xl">
                            {search ? "Tidak ada event yang sesuai dengan pencarian" : "Belum ada event tersedia"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
                            >
                                {/* Event Image */}
                                <div className="w-full h-48 overflow-hidden">
                                    {event.cover_img ? (
                                        <img
                                            src={event.cover_img}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-400">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Event Info */}
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                        {event.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2">
                                        📍 {event.location}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2">
                                        📅 {new Date(event.date).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                    </p>
                                    <p className="text-gray-700 text-sm line-clamp-2 mt-2">
                                        {event.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

