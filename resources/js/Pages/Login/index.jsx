import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";

export default function LoginPage() {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/login", { phone });
    };

    return (
        <div className="min-h-screen bg-[#E5EDF2] flex items-center justify-center">
            <form
            action="/login"
            method="post"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl px-6 py-8 w-full max-w-[360px] shadow-md"
            >
            <div className="flex items-center gap-1.5 mb-6">
                <img src="/storage/photos/Logo.png" alt="Logo" className="w-8 h-6 object-contain" />
                <div className="w-px h-4 bg-gray-300" />
                <h2 className="ml-1 font-semibold text-lg text-gray-800">Login Iuran Warga</h2>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor hp
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                <span className="text-gray-500 text-sm mr-2">+62</span>
                <input
                name="phone"
                placeholder="Ketik nomor WA"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#7C3AED] text-white text-sm py-2.5 rounded-md font-medium"
            >
                Kirim kode OTP
            </button>
        </form>
      </div>
    );
}
