"use client"

import HomepageNavbar from "@/components/HomepageNavbar";
import { useEffect, useState } from "react";
import { AiFillBulb } from "react-icons/ai";
import { BsMicFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";

interface feature {
    icon: React.ElementType,
    title: string,
    para: string
}

export default function Home() {
    const [activeIndex1, setActiveIndex1] = useState<number>(0);
    const [activeIndex2, setActiveIndex2] = useState<number>(0);

    {/*
        text-[#0365f2]
        text-[#394547]
        text-[#032b41]
    */}

    const featuresData = [
        { icon: IoDocumentText, title: "Read or listen", para: "Save time by getting the core ideas from the latest books." },
        { icon: AiFillBulb, title: "Find your next read", para: "Explore book lists and personalized recommendations." },
        { icon: BsMicFill, title: "Briefcasts", para: "Gain valuable insights from briefcasts." }
    ];

    const statsTitles1 = [
        "Enhance your knowledge", "Achieve greater success", "Improve your health", "Developer better parenting skills", "Increase Happiness", "Be the best version of yourself!"
    ];

    const statsTitles2 = [
        "Expand your learning", "Accomplish your goals", "Strengthen your vitality", "Become a caregiver", "Improve your mood", "Maximise your abilities"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex1(prevIndex => (prevIndex + 1) % statsTitles1.length);
            setActiveIndex2(prevIndex => (prevIndex + 1) % statsTitles2.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-[1000px] m-auto px-4">
            <HomepageNavbar />
            {/*LANDING SECTION*/}
            <div className="flex mt-12 justify-center">
                <div className="w-[80%] md:w-[50%] my-4 md:my-8 text-center md:text-left">
                    <h1 className="font-bold text-2xl md:text-4xl mb-6 w-full md:w-[75%] text-[#032b41]">Gain more knowledge in less time</h1>
                    <p className="font-light text-lg md:text-xl mb-8 text-[#394547]">Great summaries for busy people,<br /> individuals who barely have time to read,<br /> and even people who don't like to read.</p>
                    <button className="bg-summarist-green w-[60%] py-2 rounded-md">Login</button>
                </div>
                <img src="/assets/landing.png" alt="" className="w-[40%] hidden md:inline" />
            </div>
            {/*FEATURES SECTION*/}
            <div className="my-12">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-[#032b41]">Understand books in a few minutes</h2>
                <div className="flex flex-col md:flex-row items-center justify-between ">
                    {
                        featuresData?.map((feature: feature, index: number) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex flex-col items-center m-4 w-[80%] md:w-[30%]">
                                    <Icon className="text-6xl text-[#032b41]" />
                                    <h3 className="my-2 text-xl md:text-2xl font-semibold text-[#032b41]">{feature.title}</h3>
                                    <p className="text-center font-light text-sm md:text-lg text-[#394547]">{feature.para}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {/*Statistics section*/}
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-[90%] md:w-[50%] my-4 md:my-8">
                    {
                        statsTitles1.map((title, index) => (
                            <h2 key={index} className={`text-2xl md:text-3xl font-semibold text-[#6b757b] my-4 ${index === activeIndex1 ? 'text-summarist-green' : ''}`}>{title}</h2>
                        ))
                    }
                </div>
                <div className="w-[90%] md:w-[45%] my-4 md:my-8 bg-[#f1f6f4] px-4 py-6">
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">93%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">significantly increase</strong> reading frequency</p>
                    </div>
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">96%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">establish better</strong> habits</p>
                    </div>
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">90%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">significant positive</strong> change to their lives</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                <div className="w-[90%] md:w-[50%] my-4 md:my-8 bg-[#f1f6f4] px-6 py-8">
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">91%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">report feeling more productive</strong> after incorporating the service into their daily routine.</p>
                    </div>
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">94%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">noticed an improvement</strong> in their overall comprehension and retention of information.</p>
                    </div>
                    <div className="flex space-x-2 my-4 text-md md:text-xl">
                        <span className="font-semibold text-[#0365f2]">88%</span>
                        <p className="font-regular text-[#394547]">of Summarist members <strong className="font-bold">feel more informed</strong> about current events and industry trends since using the platform.</p>
                    </div>
                </div>
                <div className="w-[90%] md:w-[45%] my-4 md:my-8 text-left md:text-right">
                    {
                        statsTitles2.map((title, index) => (
                            <h2 key={index} className={`text-2xl md:text-3xl font-semibold text-[#6b757b] my-4 ${index === activeIndex2 ? 'text-summarist-green' : ''}`}>{title}</h2>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
