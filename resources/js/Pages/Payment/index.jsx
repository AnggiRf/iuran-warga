import React, { useState } from "react";
import BottomMenu from "../../components/molecules/BottomMenu";
import { ArrowLeft, ChevronDown, ChevronUp, Check } from "lucide-react";

export default function PaymentPage() {
  const handleBack = () => window.history.back();
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const [perMonthOpen, setPerMonthOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("null");
  const [selectedMonths, setSelectedMonths] = useState([]);

  React.useEffect(() => {
    setSelectedOption(null);
    setSelectedMonths([]);
    setPerMonthOpen(false);
  }, []);

  const handleMonthToggle = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  const totalMonths =
  selectedOption === "per_bulan"
    ? selectedMonths.length
    : selectedOption === "semua"
    ? 12
    : 0;

    const totalPayment = totalMonths * 10000;

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[480px] flex flex-col bg-white relative">
        <div className="bg-white px-4 pt-4 pb-2">
          <button onClick={handleBack} className="text-[#717680] text-sm flex items-center gap-1">
            <ArrowLeft size={14} className="text-[#717680]" />
            Kembali
          </button>
          <h1 className="text-[17px] font-bold text-[#111827] mt-4">Bayar Iuran</h1>
          <p className="text-sm text-[#6B7280]">
            Bayar iuran warga Perumahan Jati Asih tahun periode 2024.
          </p>
          <p className="text-sm text-[#6B7280]">
            tahun periode 2024.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-40">
          <div className="flex items-start justify-between">
            <label
              className="flex items-start gap-3 cursor-pointer w-full"
              onClick={() => {
                    setSelectedOption("per_bulan");
                    setPerMonthOpen(true);
                }}
            >
                <span
                    className={`w-6 h-6 mt-1 inline-block rounded-full border-2 flex items-center justify-center ${
                        selectedOption === "per_bulan" ? "bg-[#7F56D9] border-[#7F56D9]" : "border-gray-300"
                    }`}
                >
                    {selectedOption === "per_bulan" && (
                        <Check size={14} strokeWidth={3} className="text-white" />
                    )}
                </span>

              <div>
                <p className="font-medium text-[#111827]">Bayar per bulan</p>
                <p className="text-sm text-[#6B7280]">Bayar iuran perbulan periode 2024</p>
              </div>
            </label>
            <button onClick={() => setPerMonthOpen((prev) => !prev)} className="mt-1">
              {perMonthOpen ? (
                <ChevronUp size={20} color="#7F56D9" />
              ) : (
                <ChevronDown size={20} color="#7F56D9" />
              )}
            </button>
          </div>

          {perMonthOpen && selectedOption === "per_bulan" && (
            <div className="mt-4 max-h-52 overflow-y-auto pr-2 px-1 py-1 bg-white">
              {months.map((month, index) => (
                <label
                    key={month}
                    className={`flex items-center gap-2 px-2 py-3 ${
                    index !== months.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                    onClick={() => handleMonthToggle(month)}
                >
                    <span
                    className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                        selectedMonths.includes(month) ? "bg-white border-[#7F56D9]" : "border-gray-300"
                    }`}
                    >
                    {selectedMonths.includes(month) && (
                        <Check size={14} strokeWidth={3} className="text-[#7F56D9]" />
                    )}
                    </span>
                  <span className="text-[#111827]">{month}</span>
                </label>
              ))}
            </div>
          )}

          <div className="mt-6">
            <label
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => {
                setSelectedOption("semua");
                setPerMonthOpen(false);
              }}
            >
              <span
                    className={`w-6 h-6 mt-1 inline-block rounded-full border-2 flex items-center justify-center ${
                        selectedOption === "semua" ? "bg-[#7F56D9] border-[#7F56D9]" : "border-gray-300"
                    }`}
                >
                    {selectedOption === "semua" && (
                        <Check size={14} strokeWidth={3} className="text-white" />
                    )}
                </span>
              <div>
                <p className="font-medium text-[#111827]">Bayar semua periode</p>
                <p className="text-sm text-[#6B7280]">
                  Bayar semua kewajiban iuran selama periode 2024
                </p>
              </div>
            </label>
          </div>
        </div>
        <div className="fixed bottom-14 left-0 right-0 z-50 w-full max-w-[480px] mx-auto bg-white">
          <div className="px-4 py-4 border-b">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[#6B7280]">Total pembayaran</p>
              <p className="font-semibold text-[#111827]">
                Rp {totalPayment.toLocaleString("id-ID")}
              </p>
            </div>
            <p className="text-sm text-[#6B7280] mb-4">{totalMonths} Bulan</p>
            <button className="w-full py-3 bg-[#7F56D9] text-white rounded-lg text-sm font-medium">
              ➜ Geser untuk konfirmasi pembayaran
            </button>
          </div>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
}