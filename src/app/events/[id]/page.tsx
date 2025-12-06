"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getToken } from "@/utils/auth";
import EVENTS from "../detail/page";

interface BackendEvent {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    cover_img: string;
    date: string;
    createdAt: string;
}

export default function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isStaticEvent, setIsStaticEvent] = useState(false);

    useEffect(() => {
        if (id) {
            // Cek apakah ID adalah event statis (e1, e2, dll)
            const staticEvent = EVENTS.find((e) => e.id === id);
            
            if (staticEvent) {
                // Event statis
                setEvent({
                    id: staticEvent.id,
                    title: staticEvent.title,
                    date: staticEvent.date,
                    image: staticEvent.image,
                    category: staticEvent.category,
                    location: staticEvent.location,
                    description: staticEvent.description,
                    price: staticEvent.price
                });
                setIsStaticEvent(true);
                setLoading(false);
            } else {
                // Event dari backend
                fetchEventDetail(Number(id));
            }
        }
    }, [id]);

    const fetchEventDetail = async (eventId: number) => {
        try {
            setLoading(true);
            const token = getToken();

            const res = await fetch(`http://localhost:8000/api/event/${eventId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
            });

            if (!res.ok) {
                throw new Error("Event tidak ditemukan");
            }

            const result = await res.json();
            setEvent(result.data);
            setIsStaticEvent(false);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching event:", err);
            setError(err.message || "Terjadi kesalahan saat mengambil data event");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading event details...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-600 text-xl mb-4">
                        {error || "Event tidak ditemukan"}
                    </p>
                    <Link
                        href="/events"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Kembali ke Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 max-w-3xl mx-auto p-4">
            {/* Image */}
            {(isStaticEvent ? event.image : event.cover_img) ? (
                <img
                    src={isStaticEvent ? event.image : event.cover_img}
                    alt={event.title}
                    className="w-full h-72 object-cover rounded-xl mb-6"
                />
            ) : (
                <div className="w-full h-72 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No Image</span>
                </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            {/* Info */}
            <p className="text-slate-600 mb-1">
                📅 Tanggal: {isStaticEvent 
                    ? event.date 
                    : new Date(event.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }
            </p>
            <p className="text-slate-600 mb-1">
                📍 Lokasi: {event.location}
            </p>
            {isStaticEvent && event.category && (
                <p className="text-slate-600 mb-3">
                    🏷️ Kategori: {event.category}
                </p>
            )}

            {/* Price (hanya untuk event statis) */}
            {isStaticEvent && event.price > 0 && (
                <p className="text-xl font-bold text-green-600 mb-4">
                    Harga Tiket: Rp {event.price.toLocaleString("id-ID")}
                </p>
            )}

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-2">Deskripsi Event</h2>
                <p className="text-slate-700 leading-relaxed">
                    {event.description}
                </p>
            </div>

            <div>
                {/* Buy Ticket Button */}
                <Link
                    href={`/checkout/${event.id}`}
                    className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Buy Ticket
                </Link>

                {/* Back Button */}
                <Link
                    href="/home"
                    className="inline-block ml-2 px-5 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
                >
                    ← Kembali ke Home
                </Link>
            </div>
        </div>
    );
}
