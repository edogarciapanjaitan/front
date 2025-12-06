"use client";

import { useEffect, useState } from "react";
import { requireAdmin, getRole, logout, getToken } from "@/utils/auth";
import Link from "next/link";

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

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        if (requireAdmin()) {
            setRole(getRole());
            fetchEvents();
        }
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = getToken();

            if (!token) return;

            const res = await fetch("http://localhost:8000/api/event", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.ok) {
                const result = await res.json();
                setEvents(result.data || []);
            }
        } catch (err) {
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex gap-4 items-center">
                        <span className="text-sm text-gray-600">Role: <strong>{role}</strong></span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card: Create Event */}
                    <a
                        href="/events/create"
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="text-4xl mb-4">📅</div>
                        <h2 className="text-xl font-semibold mb-2">Create Event</h2>
                        <p className="text-gray-600">Buat event baru untuk platform</p>
                    </a>

                    {/* Card: Create Promotion */}
                    <a
                        href="/promotions"
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="text-4xl mb-4">🎟️</div>
                        <h2 className="text-xl font-semibold mb-2">Create Promotion</h2>
                        <p className="text-gray-600">Buat kode promo untuk event</p>
                    </a>

                    {/* Card: Manage Users */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="text-4xl mb-4">👥</div>
                        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
                        <p className="text-gray-600">Kelola pengguna platform</p>
                    </div>

                    {/* Card: View Reports */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="text-4xl mb-4">📊</div>
                        <h2 className="text-xl font-semibold mb-2">Reports</h2>
                        <p className="text-gray-600">Lihat laporan dan statistik</p>
                    </div>
                </div>

                {/* Events List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">All Events ({events.length})</h2>
                        <Link
                            href="/events"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            View All Events
                        </Link>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-600 py-8">Loading events...</p>
                    ) : events.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">Belum ada event yang dibuat.</p>
                            <Link
                                href="/events/create"
                                className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Create Your First Event
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {events.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/events/${event.id}`}
                                    className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                                >
                                    {event.cover_img && (
                                        <img
                                            src={event.cover_img}
                                            alt={event.title}
                                            className="w-full h-32 object-cover rounded-lg mb-3"
                                        />
                                    )}
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1">📍 {event.location}</p>
                                    <p className="text-sm text-gray-600">
                                        📅 {new Date(event.date).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}




