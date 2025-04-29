import React from "react";
import BottomMenu from "../../components/molecules/BottomMenu";
import Button from "../../components/atoms/Button";
import { router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";


export default function PaymentPage() {
    const handleBack = () => window.history.back();

    return (
        <div className="bg-slate-300 h-screen w-full flex flex-col items-center">
            <div className="bg-slate-300 h-screen flex flex-col items-center">
                <div className="max-w-[480px] w-full bg-white px-6 min-h-screen flex flex-col">
                    <div className="bg-[#E2EBED] -mx-6 px-6 pt-6 pb-12">
                        <button onClick={handleBack} className="text-[#717680] text-sm flex items-center gap-1">
                            <ArrowLeft size={14} className="text-[#717680]" />
                            Kembali
                        </button>
                        <h1 className="text-[17px] sm:text-[18px] font-bold text-[#111827] flex items-center gap-1 mt-4">
                            Bayar Iuran
                        </h1>
                        <p className="text-[13px] sm:text-[14px] text-[#6B7280] mt-1">
                            Bayar iuran warga Perumahan Jati Asih 
                        </p>
                        <p className="text-[13px] sm:text-[14px] text-[#6B7280]">
                            tahun periode 2024.
                        </p>
                    </div>
                </div>
                <BottomMenu />
            </div>
        </div>
    )
}