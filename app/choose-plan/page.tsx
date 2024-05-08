"use client"

import Footer from '@/components/Footer'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Feature {
    icon: React.ElementType;
    boldText: string;
    para: string;
}

export default function Page() {
    const [selectedPlan, setSelectedPlan] = useState<string>('yearly');


    const planFeaturesData: Feature[] = [
        { icon: IoDocumentText, boldText: "Key ideas in few min", para: "with many books to read" },
        { icon: RiPlantFill, boldText: "3 million", para: "people growing with Summarist everyday" },
        { icon: FaHandshake, boldText: "Precise recommendations", para: "collections curated by experts" },
    ];

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlan(event.target.value);
    };

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
                <div>
                    <h1>Choose the plan that fits you</h1>
                    <form>
                        <label className='cursor-pointer flex p-2 border-4 my-3 rounded-md'>
                            <input type="radio" value="yearly" checked={selectedPlan === 'yearly'} onChange={handlePlanChange} />
                            <div>
                                <h3>Premium Plus Yearly</h3>
                                <h2>&#8377;999/year</h2>
                                <p>7-day free trial included</p>
                            </div>
                        </label>
                        <div className="flex items-center gap-6">
                            <span className="h-[1px] bg-gray-400 w-[80%]" />
                            <p className="text-gray-500">or</p>
                            <span className="h-[1px] bg-gray-400 w-[80%]" />
                        </div>
                        <label className='cursor-pointer flex p-2 border-4 my-3 rounded-md'>
                            <input type="radio" value="monthly" checked={selectedPlan === 'monthly'} onChange={handlePlanChange} />
                            <div>
                                <h3>Premium Monthly</h3>
                                <h2>&#8377;99/month</h2>
                                <p>No trial included</p>
                            </div>
                        </label>
                        {selectedPlan === "yearly" ?
                            <div>
                                <button>Start your free 7 day trial</button>
                                <p>Cancel your trial at any time before it ends, and you won't be charged.</p>
                            </div>
                            :
                            <div>
                                <button>Start your first month</button>
                                <p>30-day money back guarantee, no questions asked.</p>
                            </div>
                        }
                    </form>
                </div>
                <div className='my-6'>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>How does the free 7-day trial work?</AccordionSummary>
                        <AccordionDetails>
                            Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Can I switch subscriptions from monthly to yearly, or yearly to monthly?</AccordionSummary>
                        <AccordionDetails>
                            While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>What's included in the Premium plan?</AccordionSummary>
                        <AccordionDetails>
                            Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Can I cancel during my trial or subscription?</AccordionSummary>
                        <AccordionDetails>
                            You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <Footer />
        </div>
    );
}