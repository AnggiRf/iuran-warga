import React, { useEffect, useRef } from "react";
import { toCurrency } from "../../utils/format";
import BottomMenu from "../../components/molecules/BottomMenu";
import { router as Inertia } from '@inertiajs/react';
import { useState } from 'react';

export default function MemberPage({ users: initialUsers, search: initialSearch }) {

    const [search, setSearch] = useState(initialSearch || '');
    const [userList, setUserList] = useState(initialUsers.data);
    const [currentPage, setCurrentPage] = useState(initialUsers.current_page);
    const [lastPage, setLastPage] = useState(initialUsers.last_page);
    const [isFetching, setIsFetching] = useState(false);
    const scrollRef = useRef(null);

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

    const getInitials = (fullname) => {
        const names = fullname.trim().split(' ');
        return names[0][0] + (names[1]?.[0] || '');
    };

    const getColorForBg = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % avatarColors.length;
        return avatarColors[index];
    };

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedSearch = useRef(debounce((value) => {
        Inertia.get('/members', { search: value }, {
            preserveState: true,
            replace: true,
            onSuccess: (page) => {
                setUserList(page.props.users.data);
                setCurrentPage(page.props.users.current_page);
                setLastPage(page.props.users.last_page);
            },
        });
    }, 500)).current;

    const fetchPage = (page, direction = 'down') => {
        if (isFetching) return;
        setIsFetching(true);

        Inertia.get('/members', { page, search }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onSuccess: (pageData) => {
                const newUsers = pageData.props.users.data;
                const el = scrollRef.current;
                const heightBefore = el?.scrollHeight || 0;
            
                setUserList((prev) => {
                    const existingIds = new Set(prev.map((u) => u.id));
                    const filtered = newUsers.filter((u) => !existingIds.has(u.id));
            
                    return direction === 'down'
                        ? [...prev, ...filtered]
                        : [...filtered, ...prev];
                });
            
                requestAnimationFrame(() => {
                    const heightAfter = el?.scrollHeight || 0;
                    const heightDiff = heightAfter - heightBefore;
            
                    if (direction === 'up' && el) {
                        el.scrollTop += heightDiff;
                    }
                });
            
                setCurrentPage(pageData.props.users.current_page);
                setLastPage(pageData.props.users.last_page);
                setIsFetching(false);
            },
        });
    };

    useEffect(() => {
        const el = scrollRef.current;
        const handleScroll = () => {
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;

            if (scrollTop + clientHeight >= scrollHeight - 100 && currentPage < lastPage) {
                fetchPage(currentPage + 1, 'down');
            }

            if (scrollTop <= 100 && currentPage > 1) {
                fetchPage(currentPage - 1, 'up');
            }
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [currentPage, lastPage, isFetching]);

    return (
        <div className="bg-slate-300 h-screen w-full flex flex-col items-center">
            <div className="max-w-[480px] w-full bg-white py-4 px-6 min-h-screen flex flex-col">
                <a href="#" className="text-gray-500 text-sm">← Kembali</a>
                <h1 className="text-2xl font-semibold mt-4">Daftar Warga</h1>
                <p className="text-gray-500 mb-4">Daftar warga Perumahan Jati Asih.</p>

                <input
                    type="text"
                    className="w-full p-2 border rounded-lg mb-4"
                    placeholder="Pencarian warga..."
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);
                        debouncedSearch(value);
                    }}
                />

                <div
                    ref={scrollRef}
                    className="overflow-y-auto flex-1 pr-2"
                >
                    {userList.map((user) => (
                        <div key={user.id} className="flex items-center mb-4">
                            {user.photo ? (
                                <img
                                    src={`/storage/photos/${user.photo}`}
                                    alt="Photo"
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                            ) : (
                                <div className={`w-10 h-10 rounded-full ${getColorForBg(user.fullname)} text-white flex items-center justify-center mr-3`}>
                                    <span className="font-bold">{getInitials(user.fullname).toUpperCase()}</span>
                                </div>
                            )}
                            <div>
                                <div className="font-semibold">{user.fullname}</div>
                                <div className="text-gray-500 text-sm">{user.address}</div>
                            </div>
                        </div>
                    ))}

                    {isFetching && (
                        <div className="text-center text-gray-400 text-sm py-4">
                            Memuat data...
                        </div>
                    )}
                </div>
            </div>
            <BottomMenu />
        </div>
    );      
}
