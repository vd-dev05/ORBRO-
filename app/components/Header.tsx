

import React, { useEffect, useState } from "react";
import Image from "next/image";

const NAVS = [
    { label: "ADVICE", href: "/" },
    { label: "CAMERA", href: "/camera" },
];

const Header: React.FC = () => {
    const [active, setActive] = useState<string>("/");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("activeTab");
            if (saved) setActive(saved);
        }
    }, []);

    const handleTab = (href: string) => {
        setActive(href);
        if (typeof window !== "undefined") {
            localStorage.setItem("activeTab", href);
        }
    };

    return (
        <header className=" flex items-center justify-between md:justify-start px-6 py-4 md:px-12 md:py-6">
            {/* Logo trái luôn hiện, không co lại */}
            <div className="flex-shrink-0  min-w-[80px]">
                <Image src="/logo_pc.svg" alt="Logo" width={122} height={28} priority />
            </div>
            {/* Menu icon mobile, ẩn trên md trở lên */}
            <button className="block md:hidden p-2" aria-label="Open menu">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="32" height="2.5" rx="1.25" fill="#171717" />
                    <rect y="14.5" width="32" height="2.5" rx="1.25" fill="#171717" />
                    <rect y="22" width="32" height="2.5" rx="1.25" fill="#171717" />
                </svg>
            </button>
            {/* Navigation desktop, ẩn trên mobile */}
            <nav className="hidden md:flex gap-2 ml-[16px] items-center">
                {NAVS.map(nav => (
                    <a
                        key={nav.href}
                        href={nav.href}
                        onClick={() => handleTab(nav.href)}
                        className={`text-lg font-semibold text-gray-800 hover:text-blue-600 px-4 py-2 rounded transition-colors ${active === nav.href ? 'bg-[#F3F3F3] rounded-xl' : ''}`}
                    >
                        {nav.label}
                    </a>
                ))}
            </nav>
        </header>
    );
};

export default Header;
