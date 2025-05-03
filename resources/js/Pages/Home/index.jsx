import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowDownRight, ArrowUpRight } from "lucide-react";
import BottomMenu from "../../components/molecules/BottomMenu";
import { usePage } from "@inertiajs/react";

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);
  const { props } = usePage();
  const { wallet, user, recent_payments, flash: { login_success, message } } = props;
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const loginMessage = message || "Login berhasil";

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value).replace(",00", "");

  const avatarColors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-400',
    'bg-yellow-400',
    'bg-lime-400',
    'bg-green-400',
    'bg-emerald-400',
    'bg-teal-400',
    'bg-cyan-400',
    'bg-blue-400',
    'bg-indigo-400',
    'bg-violet-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-rose-400',
  ];

    //create initial name if no pict
  const getInitials = (fullname) => {
      if (!fullname || typeof fullname !== 'string') return '?';
      const names = fullname.trim().split(' ');
      return names[0][0] + (names[1]?.[0] || '');
  };

  //avatar bg color
  const getColorForBg = (str) => {
    if (!str || typeof str !== 'string') return avatarColors[0]; // fallback default
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
  };

  useEffect(() => {
    if (login_success) {
      setShowLoginNotification(true);
    }
  }, [login_success]);

  return (
    <div className="bg-slate-300 min-h-screen w-full flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-white pb-24">
        <div className="bg-[#E2EBED] px-4 sm:px-6 pt-6 pb-12">
          <h1 className="text-[17px] sm:text-[18px] font-bold text-[#111827] flex items-center gap-1">
            Malam Pak {user?.fullname} <span>👋</span>
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
                  
                  {item.photo ? (
                      <img
                        src={`/storage/photos/${item.users.photo}`}
                        alt="Photo"
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                        ) : (
                        <div className={`w-10 h-10 rounded-full ${getColorForBg(item.fullname)} text-white flex items-center justify-center mr-3`}>
                          <span className="font-bold">{getInitials(item.fullname).toUpperCase()}</span>
                        </div>
                    )}
                  <div>
                    <div className="font-semibold text-[#252B37] text-sm sm:text-base">{item.fullname}</div>
                    <div className="text-sm text-[#717680]">{formatDate(item.paid_at)}</div>
                  </div>
                </div>
                <div className="text-[#252B37] font-bold text-sm sm:text-base">
                  + {formatCurrency(item.total_amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {console.log("Login success:", login_success)}
      {console.log("props:", props)}
      {showLoginNotification && (
        <div className="fixed bottom-20 w-full max-w-[480px] px-4 z-50 flex justify-center">
          <div className="bg-[#666666] text-white text-sm px-4 py-4 rounded-xl shadow-md flex items-center justify-between w-full">
            <span>{loginMessage}</span>
            <button
              onClick={() => setShowLoginNotification(false)}
              className="ml-4 text-[#B8B8B8] hover:text-white text-lg leading-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <BottomMenu/>
    </div>
  );
}
