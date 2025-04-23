import React, { useEffect, useRef, useState } from "react";
import { router as Inertia } from '@inertiajs/react';
import { toCurrency } from "../../utils/format";
import BottomMenu from "../../components/molecules/BottomMenu";

export default function ReportPage({ wallet, mutations, filters }) {
    const [mutationList, setMutationList] = useState(mutations.data);
    const [currentPage, setCurrentPage] = useState(mutations.current_page);
    const [lastPage, setLastPage] = useState(mutations.last_page);
    const [isFetching, setIsFetching] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [walletData, setWallet] = useState(wallet);

    const [filterMode, setFilterMode] = useState(filters.start_date && filters.end_date ? 'range' : 'all');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const scrollRef = useRef(null);
    const loadMoreRef = useRef(null);

    // Fungsi fetch data per page (infinite scroll)
    const fetchPage = async (page) => {
        if (isFetching || page > lastPage) return;
        setIsFetching(true);
    
        const query = new URLSearchParams({
            page,
            ...(filterMode === 'range' && {
                start_date: startDate,
                end_date: endDate,
            }),
        });
    
        try {
            const res = await fetch(`/report?${query.toString()}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (!res.ok) throw new Error('Network response was not ok');
    
            const json = await res.json();
            const newMutations = json.props.mutations.data;
    
            setMutationList((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const filtered = newMutations.filter((m) => !existingIds.has(m.id));
                return [...prev, ...filtered];
            });
    
            setCurrentPage(json.props.mutations.current_page);
            setLastPage(json.props.mutations.last_page);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsFetching(false);
        }
    };

    // Infinite scroll listener
    useEffect(() => {
        if (!loadMoreRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage < lastPage && !isFetching) {
                    fetchPage(currentPage + 1);
                }
            },
            { rootMargin: '100px' }
        );
    
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [currentPage, lastPage, isFetching]);

    // Fungsi filter utama
    const applyFilter = async (mode, start, end) => {
        const query = new URLSearchParams(
            mode === 'range' ? { start_date: start, end_date: end } : {}
        );
    
        setCurrentPage(1);
        setIsFetching(true);
    
        try {
            const res = await fetch(`/report?${query.toString()}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (!res.ok) throw new Error('Network response was not ok');
    
            const json = await res.json();
            const newWallet = json.props.wallet;
            const newMutations = json.props.mutations;
    
            setWallet(newWallet);
            setMutationList(newMutations.data);
            setCurrentPage(newMutations.current_page);
            setLastPage(newMutations.last_page);
        } catch (error) {
            console.error('Filter fetch error:', error);
        } finally {
            setIsFetching(false);
        }
    };

    // Handler klik tombol Terapkan Filter
    const handleFilterApply = () => {
        setFilterMode('range');
        applyFilter('range', startDate, endDate);
    };

    // Handler saat pilih "Semua Periode"
    const handleAllPeriod = () => {
        setFilterMode('all');
        setStartDate('');
        setEndDate('');
        applyFilter('all');
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

    return (
        <div className="bg-slate-300 h-screen flex flex-col items-center">
            <div className="max-w-[480px] w-full bg-white px-6 min-h-screen flex flex-col">
                <a href="#" className="text-gray-500 text-sm">← Kembali</a>
                <h1 className="text-lg font-semibold mt-4">Laporan iuran</h1>
                <p className="text-gray-500 mb-4 text-sm">Laporan iuran warga Perumahan Jati Asih.</p>

                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                    <div className="flex flex-col items-start">
                        <span className="text-gray-500 text-sm">Total saldo</span>
                        <div className="flex items-center gap-2">
                        <span className="font-bold text-lg tracking-widest">
                            {isBalanceVisible ? toCurrency(walletData.balance) : "●●●●●●●●●"}
                        </span>
                        <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                            {isBalanceVisible ? "🙈" : "👁️"}
                        </button>
                        </div>
                    </div>
                </div>

                {/* Filter Periode */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-md">Laporan Iuran</h2>
                    <select
                        className="text-sm border rounded px-2 py-1"
                        value={filterMode}
                        onChange={(e) => {
                            const mode = e.target.value;
                            if (mode === 'all') {
                                handleAllPeriod();
                            } else {
                                setFilterMode('range');
                            }
                        }}
                    >
                        <option value="all">Semua Periode</option>
                        <option value="range">Pilih Periode</option>
                    </select>
                </div>

                {filterMode === 'range' && (
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="flex-1 p-2 border rounded-lg text-sm"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="flex-1 p-2 border rounded-lg text-sm"
                            />
                        </div>
                        <button
                            onClick={handleFilterApply}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg w-full"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                )}

                <div className="flex justify-between mb-4">
                    <div 
                        className="rounded-lg p-3 w-[48%]"
                        style={{ backgroundColor: '#E2EBED', color: '#717680' }}
                    >
                        <div className="text-sm">Pemasukan</div>
                        <div className="text-black font-bold">{toCurrency(walletData.total_in)}</div>
                    </div>
                    <div 
                        className="rounded-lg p-3 w-[48%]"
                        style={{ backgroundColor: '#E2EBED', color: '#717680' }}
                    >
                        <div className="text-sm">Pengeluaran</div>
                        <div className="text-black font-bold">{toCurrency(walletData.total_out)}</div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <div ref={scrollRef} className="overflow-y-auto flex-1 pr-2">
                            {mutationList.map((m) => (
                                <div key={m.id} className="flex justify-between mb-4 border-b pb-2">
                                    <div className="flex items-center gap-3">
                                    <div
                                        className="rounded-full w-8 h-8 flex items-center justify-center text-sm mt-1"
                                        style={{
                                        backgroundColor: m.type === 'in' ? '#DDE4FB' : '#F8E6DF',
                                        color: m.type === 'in' ? '#476BD7' : '#C9642C',
                                        }}
                                    >
                                        {m.type === 'in' ? '↗' : '↓'}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <span className="font-semibold">{m.user.fullname}</span>
                                        <span className="text-sm text-gray-500">{m.notes || '-'}</span>
                                    </div>
                                    </div>

                                    <div className="flex flex-col text-right">
                                    <span className={`font-semibold ${m.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                        {m.type === 'in' ? '+' : '-'} {toCurrency(m.amount)}
                                    </span>
                                    <span className="text-sm text-gray-500">{formatDate(m.created_at)}</span>
                                    </div>
                                </div>
                            ))}

                            {isFetching && (
                                <div className="text-center text-gray-400 text-sm py-4">
                                    Memuat data...
                                </div>
                            )}
                            <div ref={loadMoreRef} className="h-10" />
                    </div>
                </div>
            </div>
            <BottomMenu />
        </div>
    );
}