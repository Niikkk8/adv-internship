"use client"

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "@/redux/store";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AudioPlayer from "@/components/AudioPlayer";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = store();
    }

    return (
        <Provider store={storeRef.current}>
            <AppContent>{children}</AppContent>
        </Provider>
    );
}

function AppContent({ children }: { children: React.ReactNode }) {
    const router = usePathname();
    const isHomePage: boolean = router === "/";
    const isChoosePlanPage: boolean = router === "/choose-plan";
    const isPlayerPage: boolean = router.includes("/player");

    return (
        <div className="max-h-screen flex flex-col">
            <div className={`flex ${isPlayerPage && 'h-[calc(100vh-160px)] md:h-[calc(100vh-120px)]'}`}>
                {!isHomePage && !isChoosePlanPage && <Sidebar />}
                <div className="w-full overflow-x-hidden h-screen">
                    {!isHomePage && !isChoosePlanPage && <SearchBar />}
                    {children}
                </div>
            </div>
            {isPlayerPage && <AudioPlayer />}
        </div>
    );
}
