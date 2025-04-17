import React from "react";
import { toCurrency } from "../../utils/format";
import BottomMenu from "../../components/molecules/BottomMenu";
import { usePage } from "@inertiajs/react";

export default function HomePage() {
    const { props } = usePage();
    const { wallet, user, recent_payments } = props;

    return (
        <div className="bg-slate-300 h-screen w-full flex flex-col items-center">
            <div className="max-w-[480px] w-full bg-white py-4 px-6 min-h-screen flex flex-col">
                <h1 className="text-lg font-bold">
                    Malam Pak {user?.fullname}
                </h1>
                <div className="bg-gray-300 my-2 text-sm p-2 rounded-md">
                    Pengumuman perayaan Agustus
                </div>
                <div className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md">
                    <div>
                        <div className="text-sm">Total Saldo</div>
                        <div className="text-lg font-bold">
                        {wallet && toCurrency(wallet.balance)}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <div className="text-sm">Total Pemasukan</div>
                            <div className="text-lg font-bold">
                            {wallet && toCurrency(wallet.total_in)}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">Total Pengeluaran</div>
                            <div className="text-lg font-bold">
                            {wallet && toCurrency(wallet.total_out)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-lg font-bold mt-4 mb-2">
                    Pembayaran Terakhir
                </div>
                <div className="flex flex-col gap-2">
                    {recent_payments.map((item, index) => (
                        <div className="flex flex-row justify-between border-b pb-2">
                            <div>
                                <div className="text-base font-bold">
                                    {item.users}
                                </div>
                                <div>{toCurrency(item.total_amount)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-right">
                                    Tanggal
                                </div>
                                <div>{item.paid_at}</div>
                            </div>
                        </div>
                    ))}
                    <div className="h-[50px]" />
                </div>
            </div>
            <BottomMenu />
        </div>
    );
}
