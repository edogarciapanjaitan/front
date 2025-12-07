"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EVENTS } from "@/app/events/data";
import Link from "next/link";
import { isAuthenticated } from "@/utils/auth";
// event list (harus sama seperti di landing page)

export default function CheckoutPage() {
  const { id } = useParams(); // ambil ID dari URL
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const event = EVENTS.find((e) => e.id === id);

  useEffect(() => {
    setMounted(true);
    const auth = isAuthenticated();
    
    setAuthenticated(auth);

    
    if (!auth) {
      // Redirect ke login jika belum login
      alert("Anda harus login terlebih dahulu untuk membeli tiket!");
      router.push("/login");
      return;
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Akan redirect ke login
  }

  if (!event) return <p>Event tidak ditemukan.</p>;

    return (
          <div className="max-w-xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>

        <p className="text-slate-600 mt-1">
          📅 {event.date} | 📍 {event.location}
        </p>

        <p className="mt-3 font-bold text-green-700 text-lg">
          Total: Rp {event.price.toLocaleString()}
        </p>

        <button
          className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => alert("Pembayaran berhasil! (Dummy)")}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}