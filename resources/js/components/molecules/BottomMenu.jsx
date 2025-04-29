import React from "react";
import { Link,  usePage } from "@inertiajs/react";
import { Home, Users, DollarSign, BarChart2, User } from "lucide-react";

const menuItems = [
    { href: "/home", label: "Beranda", icon: Home },
    { href: "/members", label: "Daftar Warga", icon: Users },
    { href: "/payment", label: "Bayar Iuran", icon: DollarSign },
    { href: "/report", label: "Laporan", icon: BarChart2 },
    { href: "/profile", label: "Profile", icon: User },
  ];

export default function BottomMenu({}) {
    const { url } = usePage();

    return (
        <nav className="fixed bottom-0 max-w-[480px] w-full bg-white border-t border-gray-300 flex justify-around items-center py-2">
            {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = url.startsWith(item.href);

                    return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center text-xs"
                    >
                        <Icon size={24} color={isActive ? "#7C3AED" : "#6B7280"} />
                        <span
                        className={`mt-1 ${
                            isActive ? "text-[#7C3AED]" : "text-gray-500"
                        }`}
                        >
                        {item.label}
                        </span>
                    </Link>
                    );
                })}
            </nav>
    );
}
