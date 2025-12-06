"use client";
import { useState, useEffect } from "react";
import { requireAdmin } from "@/utils/auth";

export default function CreatePromotionPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        requireAdmin();
    }, []);
  const [form, setForm] = useState({
    eventId: "",
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/promotions", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Promotion created successfully!");
    } else {
      setMessage(data.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 pt-30">
      <h1 className="text-2xl font-bold mb-4">Create Promotion</h1>

      <form onSubmit={submitForm} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium">Event ID</label>
          <input
            name="eventId"
            type="text"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Voucher Code</label>
          <input
            name="code"
            type="text"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount (%)</label>
          <input
            name="discount"
            type="number"
            step="0.1"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            name="startDate"
            type="datetime-local"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            name="endDate"
            type="datetime-local"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-gray-500 text-white py-2 rounded hover: cursor-pointer hover:bg-gray-600"
        >
          {loading ? "Creating..." : "Create Promotion"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
