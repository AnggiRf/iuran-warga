import React from "react";
import { ArrowLeft, Copy, Download, Share2 } from "lucide-react";
import BottomMenu from "../../components/molecules/BottomMenu";

export default function PaymentQRPage() {
  const handleBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center overflow-hidden">
      <div className="w-full max-w-[480px] bg-white flex flex-col relative">

        <div className="bg-white px-4 pt-4 pb-2">
          <button onClick={handleBack} className="text-[#717680] text-sm flex items-center gap-1">
            <ArrowLeft size={14} className="text-[#717680]" />
            Kembali
          </button>
          <h1 className="text-[17px] font-bold text-[#111827] mt-4">Bayar iuran</h1>
          <p className="text-sm text-[#6B7280]">
            Bayar iuran warga Perumahan Jati Asih tahun periode 2024.
          </p>
        </div>

        {/* QR Card */}
        <div className="flex-1 flex flex-col px-4 pt-4 pb-[80px]">
          <div className="bg-[#EFF4F5] rounded-xl shadow-sm w-full px-4 py-8 text-center flex-1 min-h-[500px] flex flex-col justify-between">
            <p className="text-sm text-[#6B7280] mb-1">Pak Ahmad Darmaji</p>
            <h2 className="text-2xl font-semibold text-[#111827] mb-4">Rp 50.000</h2>
            <div className="flex justify-center mb-4">
              <img
                src="/storage/photos/qr_code.png"
                alt="QR Code"
                className="w-60 h-60 rounded-lg bg-white object-contain"
              />
            </div>
            <p className="text-sm text-[#6B7280]">
              Batas waktu pembayaran <span className="font-semibold text-[#111827]">59:00</span>
            </p>

            {/* Action buttons */}
            <div className="flex justify-around mt-6">
              <button className="flex flex-col items-center text-xs text-[#6B7280]">
                <Copy size={20} />
                Copy link
              </button>
              <button className="flex flex-col items-center text-xs text-[#6B7280]">
                <Share2 size={20} />
                Share
              </button>
              <button className="flex flex-col items-center text-xs text-[#6B7280]">
                <Download size={20} />
                Save
              </button>
            </div>
          </div>

          {/* Button bawah */}
          <button className="mt-4 w-full border rounded-lg py-3 text-sm text-[#111827]">
            Kembali ke beranda
          </button>
        </div>

        {/* Bottom Menu */}
        <BottomMenu />
      </div>
    </div>
  );
}
