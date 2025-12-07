"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getToken } from "@/utils/auth";
import EVENTS from "./detail/page";

// Type untuk event statis
type StaticEventItem = {
    id: string;
    title: string;
    date: string;
    image: string;
    category: string;
    location: string;
    description: string;
    price: number;
};

// Type untuk event dari backend
interface BackendEvent {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    cover_img: string;
    date: string;
    createdAt: string;
    category?: string;
}

// Type untuk combined event
type CombinedEvent = {
    id: string;
    title: string;
    date: string;
    image: string;
    category: string;
    location: string;
    description: string;
    price: number;
    isStatic: boolean;
    backendId?: number;
};

export default function EventsPage() {
    const [backendEvents, setBackendEvents] = useState<BackendEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = getToken();

            // Fetch events dari backend jika user sudah login (optional)
            if (token) {
                const res = await fetch("http://localhost:8000/api/event", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (res.ok) {
                    const result = await res.json();
                    setBackendEvents(result.data || []);
                }
            }
        } catch (err: any) {
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    // Gabungkan event statis dengan event dari backend
    const allEvents: CombinedEvent[] = useMemo(() => [
        ...EVENTS.map(e => ({
            id: e.id,
            title: e.title,
            date: e.date,
            image: e.image,
            category: e.category,
            location: e.location.trim(),
            description: e.description,
            price: e.price,
            isStatic: true
        })),
        ...backendEvents.map(e => ({
            id: `backend-${e.id}`,
            title: e.title,
            date: e.date,
            image: e.cover_img || "",
            category: (e.category || "").trim(),
            location: (e.location || "").trim(),
            description: e.description,
            price: 0,
            isStatic: false,
            backendId: e.id
        }))
    ], [backendEvents]);

    const filteredEvents = allEvents.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );


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
                                href={event.isStatic ? `/events/${event.id}` : `/events/${event.backendId || event.id}`}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
                            >
                                {/* Event Image */}
                                <div className="w-full h-48 overflow-hidden">
                                    {event.image ? (
                                        <img
                                            src={event.image}
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
                                        📅 {event.isStatic 
                                            ? event.date 
                                            : new Date(event.date).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })
                                        }
                                    </p>
                                    {event.category && (
                                        <p className="text-xs text-blue-600 mb-2">#{event.category}</p>
                                    )}
                                    <p className="text-gray-700 text-sm line-clamp-2 mt-2">
                                        {event.description}
                                    </p>
                                    {event.price > 0 && (
                                        <p className="text-sm font-semibold text-green-600 mt-2">
                                            Rp {event.price.toLocaleString("id-ID")}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

