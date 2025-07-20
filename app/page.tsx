
"use client";

import AdviceSection from "./sections/AdviceSection";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function Home() {


  const [lang, setLang] = useState<'en' | 'vi'>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang");
      if (storedLang === "en" || storedLang === "vi") {
        setLang(storedLang);
      }
    }
  }, []);


  return (
    <div
      className="min-h-screen max-w-[393px] md:max-w-[1920px] bg-[#FFF] md:mx-[320px]"
    >
      {/* Responsive: Header tự xử lý, không cần prop isDesktop */}
      <Header />
      <AdviceSection lang={lang} />
      <div style={{ alignSelf: 'stretch', height: 64, paddingTop: 54, paddingBottom: 54 }} />
    </div>
  );
}
