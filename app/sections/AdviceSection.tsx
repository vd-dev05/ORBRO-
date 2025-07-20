"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import AdviceCard from "../components/AdviceCard";
import { translations } from "../[lang]/translations";

interface AdviceSectionProps {
    lang: "en" | "vi";
}

const AdviceSection: React.FC<AdviceSectionProps> = ({ lang }) => {
    const [running, setRunning] = useState(false);
    const [images, setImages] = useState<string[]>(["", "", ""]);
    const [advices, setAdvices] = useState<string[]>(["", "", ""]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const t = translations[lang];

    const fetchData = async () => {
        // Fetch 3 images
        const imgUrls = await Promise.all([
            fetch("https://picsum.photos/800").then(r => r.url),
            fetch("https://picsum.photos/800").then(r => r.url),
            fetch("https://picsum.photos/800").then(r => r.url),
        ]);
        setImages(imgUrls);
        // Fetch 3 advices
        const advicesArr = await Promise.all([
            fetch("https://api.adviceslip.com/advice").then(r => r.json()).then(d => d.slip.advice),
            fetch("https://api.adviceslip.com/advice").then(r => r.json()).then(d => d.slip.advice),
            fetch("https://api.adviceslip.com/advice").then(r => r.json()).then(d => d.slip.advice),
        ]);
        setAdvices(advicesArr);
    };

    const handleStart = () => {
        if (running) return;
        setRunning(true);
        fetchData();
        intervalRef.current = setInterval(fetchData, 2000);
    };

    const handleStop = () => {
        setRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Cập nhật translations (giả lập, thực tế cần API/backend hoặc context)
        // translations[lang].card_list = advices.map((advice, i) => ({ id: i+1, title: `Advice ${i+1}`, params: advice }));
    };

    const handleChangeLanguage = () => {
        const newLang = lang === "en" ? "vi" : "en";
        if (typeof window !== "undefined") {
            localStorage.setItem("lang", newLang);
            window.location.reload();
        }
    };
    return (
        <section

            className=" px-[24px] w-full sm:max-w-[1280px]  ">
            <div data-size="064" style={{ alignSelf: 'stretch', height: 64, padding: 10, opacity: 0.30 }} />
            <div className="flex flex-col gap-0   items-center md:items-start px-[32px] ">
                <h1 className="text-[18px] font-extrabold  tracking-tight">ORBRO</h1>
                <h2 className="text-[52px] font-bold ">{t.title}</h2>
                <p className="text-base text-center font-normal md:text-left max-w-[1168px] mb-4">
                    {t.quote}
                </p>
                <div className="flex gap-2 mb-4">
                    {!running ? (
                        <button
                            onClick={handleStart}
                            style={{
                                paddingLeft: 32, paddingRight: 32, paddingTop: 16, paddingBottom: 16,
                                background: '#2A70F0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex',
                            }}
                        >
                            <div className="text-center justify-center flex flex-col text-white text-[16px] font-pretendard font-medium leading-[20px] break-words">
                                START
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            style={{
                                paddingLeft: 32, paddingRight: 32, paddingTop: 16, paddingBottom: 16,
                                background: '#FF5D5D', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex',
                            }}
                        >
                            <div className="text-center justify-center flex flex-col text-white text-[16px] font-pretendard font-medium leading-[20px] break-words">
                                STOP
                            </div>
                        </button>
                    )}
                    <button
                        onClick={handleChangeLanguage}
                        style={{
                            paddingLeft: 32, paddingRight: 32, paddingTop: 16, paddingBottom: 16,
                            background: 'black', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex',
                        }}
                    >
                        <div className="text-center justify-center flex flex-col text-white text-[16px] font-pretendard font-medium leading-[20px] break-words">
                            LANGUAGE
                        </div>
                    </button>
                </div>
            </div>
            <div data-size="096" style={{ alignSelf: 'stretch', height: 96, padding: 10, opacity: 0.20, background: 'white' }} />

            <h2 className="text-3xl font-bold text-center mb-10">{t.advice}</h2>
            <div data-size="064" style={{ alignSelf: 'stretch', height: 64, padding: 10, opacity: 0.20, background: 'white' }} />

            <div className="flex flex-col gap-10">
                {[0, 1, 2].map((i) => (
                    <AdviceCard
                        reverse={i % 2 === 1}
                        key={i}
                        title={advices[i] ? `Advice ${i + 1}` : t.card_list[i]?.title || `Advice ${i + 1}`}
                        description={advices[i] || t.card_list[i]?.params || ''}
                        image={images[i]
                            ? <Image
                                src={images[i]}
                                alt={`Image${i + 1}`}
                                width={536}
                                height={400}
                                className="h-[200px] w-[362px] md:h-[400px] md:w-[536px] object-fill rounded-2xl md:rounded"
                                unoptimized
                            />
                            : <span className="">Image{i + 1} Here</span>
                        }
                    />
                ))}
            </div>
        </section>
    );
};

export default AdviceSection;
