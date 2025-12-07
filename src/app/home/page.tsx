"use client";

import React, { JSX, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated, isAdmin, isUser, getRole, getToken } from "@/utils/auth";

// type event statis
export type StaticEventItem = {
    id: string;
    title: string;
    date: string;
    image: string;
    category: string;
    location: string;
    description: string;
    price: number;
};

// type event dari backend
export type BackendEventItem = {
    id: number;
    title: string;
    date: string;
    cover_img: string;
    location: string;
    description: string;
    slug: string;
    category?: string; // Optional karena mungkin backend tidak selalu mengirim category
};

// Event statis yang selalu ditampilkan untuk semua (guest, user, admin)
const STATIC_EVENTS: StaticEventItem[] = [
    {
        id: "e1",
        title: "Tech Conference 2025",
        date: "2025-12-12",
        image: "/tc.jpg",
        category: "Technology",
        location: "Jakarta",
        description: "Konferensi teknologi terbesar dengan pembicara internasional.",
        price: 150000
    },
    {
        id: "e2",
        title: "Music Festival Summerwave",
        date: "2025-08-20",
        image: "/sf.webp",
        category: "Music",
        location: "Bali",
        description: "Festival musik pantai dengan banyak artis terkenal.",
        price: 250000,
    },
    {
        id: "e3",
        title: "Business Leadership Summit",
        date: "2025-09-05",
        image: "/ls.jpg",
        category: "Business",
        location: "Bandung",
        description: "Acara networking dan seminar untuk para pemimpin bisnis.",
        price: 300000,
    },
    {
        id: "e4",
        title: "Marathon Nusantara Run",
        date: "2025-07-15",
        image: "/run.jpg",
        category: "Sports",
        location: "Surabaya",
        description: "Lomba lari marathon tahunan berskala nasional.",
        price: 100000,
    },
    {
        id: "e5",
        title: "Sound Fest",
        date: "2025-07-15",
        image: "/sf.jpeg",
        category: "Music",
        location: "Jakarta",
        description: "Festival music terbesar di Indonesia.",
        price: 200000,  
    },
    {
        id: "e6",
        title: "Bojue Championship",
        date: "2025-07-15",
        image: "/bl.jpg",
        category: "Sports",
        location: "Tanggerang",
        description: "Lomba lari marathon tahunan berskala nasional.",
        price: 150000,
    },
];

export default function LandingPage(): JSX.Element {
    const [backendEvents, setBackendEvents] = useState<BackendEventItem[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<StaticEventItem | null>(null);
    const [mounted, setMounted] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        setAuthenticated(isAuthenticated());
        setAdmin(isAdmin());
        setUser(isUser());
        setRole(getRole());
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = getToken();

            // Jika sudah login, fetch dari backend
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
        } catch (err) {
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    // Gabungkan event statis dengan event dari backend
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

    const allEvents: CombinedEvent[] = useMemo(() => [
        ...STATIC_EVENTS.map(e => ({
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
            category: (e.category || "").trim(), // Gunakan category dari backend jika ada
            location: (e.location || "").trim(), // Pastikan location juga ada dan trim whitespace
            description: e.description,
            price: 0,
            isStatic: false,
            backendId: e.id
        }))
    ], [backendEvents]);

    const categories = useMemo(() => 
        Array.from(new Set(allEvents.map((e) => e.category).filter(Boolean))).sort(),
        [allEvents]
    );
    
    const locations = useMemo(() => 
        Array.from(new Set(allEvents.map((e) => e.location).filter(Boolean))).sort(),
        [allEvents]
    );

    const filteredEvents = allEvents.filter((e) => {
        const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
        // Filter category: jika category filter kosong, tampilkan semua. Jika tidak, hanya tampilkan yang category-nya match
        const matchesCategory = category === "" || (e.category && e.category.trim() === category.trim());
        // Filter location: jika location filter kosong, tampilkan semua. Jika tidak, match exact (case insensitive)
        const eventLocation = (e.location || "").trim().toLowerCase();
        const filterLocation = location.trim().toLowerCase();
        const matchesLocation = location === "" || (eventLocation && eventLocation === filterLocation);
        return matchesSearch && matchesCategory && matchesLocation;
    });
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
    <div>
        <div className="relative w-full h-screen pt-20">
        <img className="w-full h-full object-cover absolute top-0 left-0" src="/lp.jpg" alt="background"/>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Your Adventure Starts Now</h1>
          {/* Tampilkan role jika sudah login */}
          {authenticated && (
              <p className="mt-4 text-lg">
                  Welcome, {role === "ADMIN" ? "Admin" : "User"}!
              </p>
          )}
        </div>
    </div>
        <div className="min-h-screen bg-slate-50 p-6">
            <header className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
                <p className="text-slate-600">Jelajahi event menarik yang akan datang.</p>
                
                {/* Quick Action untuk Admin */}
                {admin && authenticated && (
                    <div className="mt-4">
                        <Link 
                            href="/admin/dashboard"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Go to Admin Dashboard
                        </Link>
                    </div>
                )}
            </header>
            <section className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search events..."
                    className="px-3 py-2 border rounded-md shadow-sm w-64"
                />
                {categories.length > 0 && (
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                )}
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </section>

            {loading && authenticated ? (
                <div className="max-w-4xl mx-auto text-center py-12">
                    <p className="text-gray-600">Loading events from database...</p>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="max-w-4xl mx-auto text-center py-12">
                    <p className="text-gray-600">Tidak ada event yang sesuai dengan filter.</p>
                </div>
            ) : (
                <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {filteredEvents.map((event) => {
                        // Tentukan href berdasarkan apakah event dari backend atau statis
                        const eventHref = event.isStatic 
                            ? `/events/${event.id}` 
                            : `/events/${event.backendId || event.id}`;
                        
                        return (
                            <Link
                                key={event.id} 
                                href={eventHref}
                            >
                                <article className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer">
                                    {event.image && (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-48 object-cover rounded-lg mb-3"
                                        />
                                    )}
                                    <h2 className="text-xl font-semibold">{event.title}</h2>
                                    <p className="text-sm text-slate-500">
                                        {event.date} — {event.location}
                                    </p>
                                    {event.category && (
                                        <p className="text-xs text-blue-600 mt-1">#{event.category}</p>
                                    )}
                                    <p className="mt-2 text-sm text-slate-700 line-clamp-2">{event.description}</p>
                                    {event.price > 0 && (
                                        <p className="text-sm font-semibold text-green-600 mt-2">
                                            Rp {event.price.toLocaleString("id-ID")}
                                        </p>
                                    )}
                                </article>
                            </Link>
                        );
                    })}
                </main>
            )}

            {selectedEvent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 pt-20">
                    <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl">
                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.title}  
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />   
                        <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                        <p className="text-sm text-slate-600 mb-1">Tanggal: {selectedEvent.date}</p>
                        <p className="text-sm text-slate-600 mb-1">Lokasi: {selectedEvent.location}</p>
                        {selectedEvent.category && (
                            <p className="text-sm text-slate-600 mb-3">Kategori: {selectedEvent.category}</p>
                        )}
                        <p className="text-slate-700 mb-4">{selectedEvent.description}</p>
                        {selectedEvent.price > 0 && (
                            <p className="text-sm font-bold text-green-700 mb-3">
                                Harga Tiket: Rp {selectedEvent.price.toLocaleString("id-ID")}
                            </p>
                        )}
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="w-full py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
}