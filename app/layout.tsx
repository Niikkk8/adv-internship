import React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import LoginModal from "@/components/LoginModal";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Summarist Internship",
  description: "Generated by create next app",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Summarist Internship</title>
        <meta name="description" content="Generated by create next app" />
      </head>
      <body className={`${roboto.className} flex`}>
        <StoreProvider>
          {children}
          <LoginModal />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
