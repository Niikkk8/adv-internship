import HomepageNavbar from "@/components/HomepageNavbar";

export default function Home() {
    return (
        <div className="max-w-[1000px] m-auto px-4">
            <HomepageNavbar />
            {/*LANDING SECTION*/}
            <div className="flex mt-12 justify-between">
                <div className="w-[50%]">
                    <h1 className="font-bold text-4xl mb-6 w-[75%]">Gain more knowledge in less time</h1>
                    <p className="font-light text-xl mb-8">Great summaries for busy people,<br /> individuals who barely have time to read,<br /> and even people who don't like to read.</p>
                    <button className="bg-summarist-green w-[60%] py-2 rounded-md">Login</button>
                </div>
                <img src="/assets/landing.png" alt="" className="w-[40%]"/>
            </div>
        </div>
    );
}
