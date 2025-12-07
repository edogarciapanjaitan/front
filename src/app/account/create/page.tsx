"use client";

import { useState } from "react";

export default function AccountCreationPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //  validation
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    console.log("Account created:", form);

    alert("Akun berhasil dibuat!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-24 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        {error && (
          <p className="mb-4 text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Tlp */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="text-slate-800 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

