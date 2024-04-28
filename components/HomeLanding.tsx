"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openLoginModal } from "@/redux/modalSlice";
import React from "react";

const HomeLanding = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center mt-12">
      <div className="w-[80%] md:w-[50%] my-4 md:my-8 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-4xl mb-6 w-full md:w-[75%] text-[#032b41]">
          Gain more knowledge in less time
        </h1>
        <p className="font-light text-lg md:text-xl mb-8 text-[#394547]">
          Great summaries for busy people,
          <br /> individuals who barely have time to read,
          <br /> and even people who don't like to read.
        </p>
        <button
          className="bg-summarist-green w-[60%] py-2 rounded-md button-transform"
          onClick={() => dispatch(openLoginModal())}>
          Login
        </button>
      </div>
      <img src="/assets/landing.png" alt="" className="w-[40%] hidden md:inline" />
    </div>
  );
};

export default HomeLanding;
