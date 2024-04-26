"use client"
import Footer from "@/components/Footer";
import HomepageNavbar from "@/components/HomepageNavbar";
import { openLoginModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { AiFillBulb, AiFillStar } from "react-icons/ai";
import { BiCrown, BiLeaf } from "react-icons/bi";
import { BsMicFill } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface feature {
    icon: React.ElementType,
    title: string,
    para: string
}

{/*
    text-[#0365f2]
    text-[#394547]
    text-[#032b41]
*/}

export default function Home() {
    const dispatch = useDispatch()
    const [activeIndex1, setActiveIndex1] = useState<number>(0);
    const [activeIndex2, setActiveIndex2] = useState<number>(0);

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
        <>
            <HomepageNavbar />
            <div className="max-w-[1000px] m-auto px-4">
                {/*LANDING SECTION*/}
                <div className="flex mt-12 justify-center">
                    <div className="w-[80%] md:w-[50%] my-4 md:my-8 text-center md:text-left">
                        <h1 className="font-bold text-2xl md:text-4xl mb-6 w-full md:w-[75%] text-[#032b41]">Gain more knowledge in less time</h1>
                        <p className="font-light text-lg md:text-xl mb-8 text-[#394547]">Great summaries for busy people,<br /> individuals who barely have time to read,<br /> and even people who don't like to read.</p>
                        <button className="bg-summarist-green w-[60%] py-2 rounded-md" onClick={() => dispatch(openLoginModal())}>Login</button>
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
                {/*TESTIMONIALS SECTION*/}
                <div className="flex flex-col items-center my-12">
                    <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-[#032b41]">What our members say</h2>
                    <div className="mb-4">
                        <div className="w-[90%] max-w-[700px] mx-auto my-6 p-6 bg-[#fff3d7]">
                            <div className="flex items-center space-x-2">
                                <h4 className="font-light text-lg text-[#032b41]">Hanna M.</h4>
                                <div className="flex text-[#0365f2]">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                            </div>
                            <p className="text-md font-light text-[#394547]">This app has been a <strong className="font-bold">game-changer</strong> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.</p>
                        </div>
                        <div className="w-[90%] max-w-[700px] mx-auto my-6 p-6 bg-[#fff3d7]">
                            <div className="flex items-center space-x-2">
                                <h4 className="font-light text-lg text-[#032b41]">David B.</h4>
                                <div className="flex text-[#0365f2]">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                            </div>
                            <p className="text-md font-light text-[#394547]">I love this app! It provides <strong className="font-bold">concise and accurate summaries</strong> of books in a way that is easy to understand. It's also very user-friendly and intuitive.</p>
                        </div>
                        <div className="w-[90%] max-w-[700px] mx-auto my-6 p-6 bg-[#fff3d7]">
                            <div className="flex items-center space-x-2">
                                <h4 className="font-light text-lg text-[#032b41]">Nathan S.</h4>
                                <div className="flex text-[#0365f2]">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                            </div>
                            <p className="text-md font-light text-[#394547]">This app is a great way to get the main takeaways from a book without having to read the entire thing. <strong className="font-bold">The summaries are well-written and informative.</strong> Definitely worth downloading.</p>
                        </div>
                        <div className="w-[90%] max-w-[700px] mx-auto my-6 p-6 bg-[#fff3d7]">
                            <div className="flex items-center space-x-2">
                                <h4 className="font-light text-lg text-[#032b41]">Ryan R.</h4>
                                <div className="flex text-[#0365f2]">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                            </div>
                            <p className="text-md font-light text-[#394547]">If you're a busy person who <strong className="font-bold">loves reading but doesn't have the time</strong> to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.</p>
                        </div>
                    </div>
                    <button className="bg-summarist-green w-[30%] py-2 rounded-md">Login</button>
                </div>
                {/*ACHIEVEMENTS SECTION*/}
                <div className="my-10">
                    <h1 className="text-xl md:text-3xl font-bold text-center mb-8 text-[#032b41]">Start growing with Summarist now</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#d7e9ff] flex flex-col justify-between px-4 py-8 rounded-xl">
                            <BiCrown className="w-12 h-12 mx-auto text-[#0365f2]" />
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-[#032b41]">3 Million</h2>
                                <p className="text-[#394547] font-light text-md">Downloads on all platforms</p>
                            </div>
                        </div>
                        <div className="bg-[#d7e9ff] flex flex-col justify-between px-4 py-8 rounded-xl">
                            <div className="flex justify-center items-center">
                                <FaStar size={22} className="text-[#0365f2]" />
                                <FaStar size={22} className="text-[#0365f2]" />
                                <FaStar size={22} className="text-[#0365f2]" />
                                <FaStar size={22} className="text-[#0365f2]" />
                                <FaStarHalfAlt size={21} className="text-[#0365f2]" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-[#032b41]">4.5 Stars</h2>
                                <p className="text-[#394547] font-light text-md">Average ratings on iOS and Google Play</p>
                            </div>
                        </div>
                        <div className="bg-[#d7e9ff] flex flex-col justify-between px-4 py-8 rounded-xl">
                            <BiLeaf className="w-12 h-12 mx-auto text-[#0365f2]" />
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-[#032b41]">97%</h2>
                                <p className="text-[#394547] font-light text-md">Of Summarist members create a better reading habit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}