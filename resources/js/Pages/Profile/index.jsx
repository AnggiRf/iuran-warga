import React from "react";
import { toCurrency } from "../../utils/format";
import BottomMenu from "../../components/molecules/BottomMenu";
import Button from "../../components/atoms/Button";
import { router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
    const { user } = usePage().props;
    const handleBack = () => window.history.back();
    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="bg-slate-300 h-screen w-full flex flex-col items-center">
            <div className="max-w-[480px] w-full bg-white px-6 min-h-screen flex flex-col">
                <div className="bg-[#E2EBED] -mx-6 px-6 pt-2 pb-12">
                    <button onClick={handleBack} className="text-[#717680] text-sm flex items-center gap-1">
                        <ArrowLeft size={14} className="text-[#717680]" />
                        Kembali
                    </button>
                </div>
                <div className="pt-1 flex items-start gap-4 relative z-20 -mt-8">
                    <img
                        src={`/storage/photos/${user.photo}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#269a38]"
                    />
                    <div className="pt-8">
                        <div className="text-base font-semibold text-[#000000]">{user?.fullname || "Bagus Suryana"}</div>
                        <div className="text-sm text-[#717680]">{user?.phone}</div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm text-[#717680] font-medium mb-1">Alamat</div>
                    <div className="text-[15px] text-[#000000]">
                        {user?.address}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm text-[#717680] font-medium mb-1">Emergency Contact</div>
                    <div className="text-[15px] text-[#000000]">
                        {user?.phone}
                    </div>
                </div>
                <Button
                    onClick={handleLogout}
                    type="button"
                    className="mt-8"
                    bgColor="bg-black"
                    label="Keluar"
                />
            </div>
            <BottomMenu />
        </div>
    );
}
