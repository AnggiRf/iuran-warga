import React, { useState, useRef } from "react";
import { Head, router, usePage } from "@inertiajs/react";

export default function LoginOtpPage() {
    const { phone } = usePage().props;
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
        inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/login/otp", { phone, otp: otp.join("") });
    };

    return (
        <>
        <Head title="OTP Login" />
        <div className="min-h-screen bg-[#E5EDF2] flex items-center justify-center px-4">
            <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl px-6 py-8 w-full max-w-[360px] shadow-md"
            >
            <div className="flex items-center gap-1.5 mb-6">
                <img src="/images/Logo.png" alt="Logo" className="w-8 h-6 object-contain" />
                <div className="w-px h-4 bg-gray-300" />
                <h2 className="ml-1 font-semibold text-lg text-gray-800">Login Iuran Warga</h2>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-3">
                Masukkan Kode OTP
            </label>
            <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    className="w-10 h-12 text-center border rounded-md text-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputs.current[index] = el)}
                />
                ))}
            </div>

            <button
                type="submit"
                className="w-full bg-[#7C3AED] text-white text-sm py-2.5 rounded-md font-medium"
            >
                Konfirmasi
            </button>
            </form>
        </div>
        </>
    );
}
