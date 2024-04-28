"use client"
import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import LoginModal from '@/components/LoginModal';
import { usePathname } from 'next/navigation';
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Summarist Internship',
//     description: 'Generated by create next app',
// };

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const router = usePathname();
    // console.log(router)
    return (
        <Provider store={store}>
            <html lang="en">
                <head>
                    <title>Summarist Internship</title>
                    <meta name="description" content="Generated by create next app" />
                </head>
                <body className={`${roboto.className}`}>
                    {/* {router !== '/' && (
                        <h1>Sidebar Content</h1>
                    )} */}
                    {children}
                    <LoginModal />
                </body>
            </html>
        </Provider>
    );
}

export default RootLayout;