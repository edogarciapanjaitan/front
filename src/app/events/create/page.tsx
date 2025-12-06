"use client";

import { useState, useEffect } from "react";
import { requireAdmin } from "@/utils/auth";

export default function CreateEventPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        requireAdmin();
    }, []);
  const [form, setForm] = useState({
    name: "",
    price: "",
    startDate: "",
    endDate: "",
    seats: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Event Created:", form);

    alert("Event berhasil dibuat!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-24">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Event Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Price (Rp)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Available Seats */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Available Seats</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition hover:cursor-pointer"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
