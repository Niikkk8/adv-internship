"use client"

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = store();
    }

    const router = usePathname();
    // const currentPath = router.pathname;
    const isHomePage: boolean = router === "/";

    return (
        <Provider store={storeRef.current}>
            <>
                {!isHomePage && <Sidebar />}
                {children}
            </>
        </Provider>
    );
}
