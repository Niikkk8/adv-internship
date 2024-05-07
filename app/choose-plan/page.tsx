import Footer from '@/components/Footer'
import Image from 'next/image'
import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

interface Feature {
    icon: React.ElementType;
    boldText: string;
    para: string;
}

export default function Page() {
    const planFeaturesData: Feature[] = [
        { icon: IoDocumentText, boldText: "Key ideas in few min", para: "with many books to read" },
        { icon: RiPlantFill, boldText: "3 million", para: "people growing with Summarist everyday" },
        { icon: FaHandshake, boldText: "Precise recommendations", para: "collections curated by experts" },
    ];

    return (
        <div>
            <div className='bg-[#032b41] pt-12 rounded-b-[240px]'>
                <div className='max-w-[1200px] mx-auto'>
                    <h1 className='font-bold text-5xl text-white w-[70%] mx-auto text-center'>Get unlimited access to many amazing books to read</h1>
                    <p className='text-white  text-xl mt-12 text-center'>Turn ordinary moments into amazing learning opportunities</p>
                    <Image src={'/assets/pricing-top.png'} alt='' width={340} height={340} className='mt-12 rounded-t-full mx-auto' />
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto'>
                <div className='flex justify-center mt-12'>
                    {planFeaturesData?.map((feature: Feature, index: number) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="flex flex-col items-center m-4 w-[80%] md:w-[26%]">
                                <Icon className="text-5xl text-[#032b41]" />
                                <p className="text-center text-md md:text-lg text-[#394547] w-[80%] mt-3">
                                    <span className='font-semibold text-[#032b41]'>
                                        {feature.boldText + " "}
                                    </span>
                                    {feature.para}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}