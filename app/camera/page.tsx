"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";

// Sử dụng dynamic import để tránh SSR lỗi với leaflet
const MapWithPopup = dynamic(() => import("./MapWithPopup"), { ssr: false });

export default function CameraPage() {
    return (
        <div className="min-h-screen max-w-[1920px] px-[320px] bg-[#FFF] mx-auto">
            <Header />
            <main className="flex flex-col items-center justify-center mt-8">
                {/* <h1 className="text-3xl font-bold mb-4">CAMERA</h1> */}
                <MapWithPopup />
            </main>
        </div>
    );
}
