import React, { useState } from "react";
import BottomMenu from "../../components/molecules/BottomMenu";
import { Share2, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-300 flex justify-center overflow-hidden">
            <div className="w-full max-w-[480px] bg-white flex flex-col relative">
                {/* header */}
                <div className="bg-white px-4 pt-4 pb-2 flex justify-center">
                    <h1 className="text-[24px] font-bold text-[#252B37] mt-4">Pembayaran Sukses</h1>
                </div>
                <div className="px-4 pt-20 pb-10 flex flex-col items-center relative">
                    <div className="w-full relative flex justify-center">
                        <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute -top-12 z-10 flex items-center justify-center"
                        >
                        {/* Lingkaran luar */}
                        <div className="bg-[#E0F7EF] rounded-full p-[18px] sm:p-[22px] flex items-center justify-center">
                            {/* Lingkaran dalam */}
                            <div className="bg-[#23A26D] rounded-full p-4 sm:p-5 flex items-center justify-center">
                            <Check className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                        </div>
                        </motion.div>
                    </div>
                    <div className="bg-[#EFF4F5] rounded-xl w-full max-w-md px-4 pt-20 pb-6 text-sm text-[#4B5563] mt-6 mb-6 relative z-0">
                        <div className="flex justify-between mb-2">
                        <span>Nama Warga</span>
                        <span className="font-semibold text-[#111827] text-right">Pak Ahmad Darmaji</span>
                        </div>
                        <div className="flex justify-between">
                        <span>Nominal</span>
                        <span className="font-semibold text-[#111827] text-right">Rp 50.000</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-4">
                        <button className="flex-1 border border-[#D1D5DB] rounded-lg py-2 flex justify-center items-center text-[#111827] font-medium">
                            <Share2 size={20} className="mr-3"/>
                            Bagikan
                        </button>
                        <button className="flex-1 bg-[#8B5CF6] text-white rounded-lg py-2 font-medium">
                            Bayar iuran lain
                        </button>
                    </div>
                    <a href="#" className="text-[#374151] text-sm underline">Kembali ke beranda</a>
                </div>
                <BottomMenu />        
            </div>
        </div>
    )
}

