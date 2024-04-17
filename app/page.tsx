import HomepageNavbar from "@/components/HomepageNavbar";
import featuresData from './dataArray'

interface feature{
    icon: React.ElementType,
    title: string,
    para: string
}

export default function Home() {
    return (
        <div className="max-w-[1000px] m-auto px-4">
            <HomepageNavbar />
            {/*LANDING SECTION*/}
            <div className="flex mt-12 justify-center">
                <div className="w-[80%] md:w-[50%] text-center md:text-left">
                    <h1 className="font-bold text-2xl md:text-4xl mb-6 w-full md:w-[75%]">Gain more knowledge in less time</h1>
                    <p className="font-light text-lg md:text-xl mb-8">Great summaries for busy people,<br /> individuals who barely have time to read,<br /> and even people who don't like to read.</p>
                    <button className="bg-summarist-green w-[60%] py-2 rounded-md">Login</button>
                </div>
                <img src="/assets/landing.png" alt="" className="w-[40%] hidden md:inline" />
            </div>
            {/*FEATURES SECTION*/}
            <div className="my-12">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-8">Understand books in a few minutes</h2>
                <div className="flex flex-col md:flex-row items-center justify-between ">
                    {
                        featuresData?.map((feature: feature, index: number) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex flex-col items-center m-4 w-[80%] md:w-[30%]">
                                    <Icon className="text-5xl" />
                                    <h3 className="my-2 text-lg md:text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-center font-light text-sm md:text-lg">{feature.para}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
