import React, { useState } from "react";
import { Eye, EyeOff, ArrowDownRight, ArrowUpRight } from "lucide-react";
import BottomMenu from "../../components/molecules/BottomMenu";

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);
  const [showLoginNotification, setShowLoginNotification] = useState(true);

  const wallet = {
    balance: 1124098235,
    total_in: 120098235,
    total_out: 24098235,
  };

  const recent_payments = [
    { name: "Ahmad Jaelani", date: "Senin, 18 Nov 2024", amount: 10000, initials: "AJ", color: "bg-green-400" },
    { name: "John Sunantra", date: "Senin, 18 Nov 2024", amount: 10000, initials: "JS", color: "bg-blue-500" },
    { name: "Fauzi Ahmad", date: "Senin, 18 Nov 2024", amount: 10000, initials: "FA", color: "bg-lime-400" },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value).replace(",00", "");

  return (
    <div className="bg-slate-300 min-h-screen w-full flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-white pb-24">
        <div className="bg-[#E2EBED] px-4 sm:px-6 pt-6 pb-12">
          <h1 className="text-[17px] sm:text-[18px] font-bold text-[#111827] flex items-center gap-1">
            Halo, Pak Bagus <span>👋</span>
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#717680] mt-1">
            Berikut laporan iuran warga Perumahan Jati Asih 
          </p>
          <p className="text-[13px] sm:text-[14px] text-[#717680]">
            tahun periode 2024.
          </p>
        </div>
        <div className="bg-white mx-4 sm:mx-6 p-5 sm:p-6 rounded-2xl shadow-md -mt-6">
          <div className="flex items-center justify-between">
            <div className="text-[#717680] text-sm">Total saldo</div>
          </div>
          <div className="flex items-center text-[22px] sm:text-[24px] font-bold text-[#111827] mt-2">
            <span className="min-w-[120px]">
                {showBalance ? formatCurrency(wallet.balance) : "•••••••••••"}
            </span>
            <button onClick={() => setShowBalance(!showBalance)} className="ml-2">
              {showBalance ? <Eye size={20} className="text-gray-400" /> : <EyeOff size={20} className="text-gray-400" />}
            </button>
          </div>
          <div className="flex justify-around items-start mt-6 gap-4 pt-4">
            <div className="flex-1 border-l-2 pl-4">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#6941C6] rounded-full flex items-center justify-center">
                        <ArrowUpRight size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-[#717680]">Pemasukan</span>
                </div>
                <div className="text-sm font-semibold text-[#111827] mt-1">{formatCurrency(wallet.total_in)}</div>
            </div>
            <div className="flex-1 border-l-2 pl-4">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#F04438] rounded-full flex items-center justify-center">
                        <ArrowDownRight size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-[#717680]">Pengeluaran</span>
                </div>
                <div className="text-sm font-semibold text-[#111827] mt-1">{formatCurrency(wallet.total_out)}</div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 mt-8">
          <h2 className="text-[16px] sm:text-[17px] font-bold text-[#111827] mb-3">
            Pembayaran terakhir
          </h2>
          <div className="flex flex-col gap-4">
            {recent_payments.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${item.color}`}>
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#111827] text-sm sm:text-base">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className="text-[#16A34A] font-bold text-sm sm:text-base">
                  + {formatCurrency(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showLoginNotification && (
        <div className="fixed bottom-20 w-full max-w-[480px] px-4 z-50 flex justify-center">
          <div className="bg-[#666666] text-white text-sm px-4 py-4 rounded-xl shadow-md flex items-center justify-between w-full">
            <span>Login berhasil</span>
            <button onClick={() => setShowLoginNotification(false)} className="ml-4 text-[#B8B8B8] hover:text-white text-lg leading-none">
              &times;
            </button>
          </div>
        </div>
      )}
      <BottomMenu/>
    </div>
  );
}
