"use client"

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "@/redux/store";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = store();
    }

    const router = usePathname();
    // const currentPath = router.pathname;
    const isHomePage: boolean = router === "/";
    const isSettingsPage: boolean = router === '/settings';
    const isChoosePlanPAge: boolean = router === '/choose-plan'
    return (
        <Provider store={storeRef.current}>
            {!isHomePage && !isChoosePlanPAge && <Sidebar />}
            <div className="w-full overflow-x-hidden h-screen">
                {!isHomePage && !isChoosePlanPAge && <SearchBar />}
                {children}
            </div>
        </Provider>
    );
}
