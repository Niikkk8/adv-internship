"use client"

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { openLoginModal } from '@/redux/modalSlice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface UserState {
    userId: string | null;
    userEmail: string | null;
    userSubscriptionStatus: string | null;
    userSavedBooks: string[];
    userFinishedBooks: string[];
}

export default function page() {
    const user = useAppSelector((state: { user: UserState }) => state.user);
    const dispatch = useAppDispatch()
    return (
        <>
            {
                user.userId ?
                    <div className='max-w-[1200px] mx-auto px-2 my-6' >
                        <h1 className='py-4 border-b text-4xl font-semibold text-[#032b41]'>Settings</h1>
                        <div className='py-4 border-b'>
                            <h3 className='text-xl text-[#032b41] font-semibold'>Your subscription plan</h3>
                            <p className='my-1'>{user.userSubscriptionStatus}</p>
                            {user.userSubscriptionStatus === "Basic" && <Link href={`/choose-plan`} className='bg-summarist-green py-2 px-4 rounded-lg my-2'>Upgrade to Premium</Link>}
                        </div>
                        <div className='my-4'>
                            <h3 className='text-xl text-[#032b41] font-semibold'>Email</h3>
                            <p>{user.userEmail}</p>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-center my-8'>
                        <Image src='/assets/login.png' alt='' height={480} width={480} />
                        <h1 className='text-center font-bold text-lg my-4'>Looks like you're not logged in</h1>
                        <button
                            className="bg-summarist-green py-2 px-20 rounded-md button-transform"
                            onClick={() => dispatch(openLoginModal())}>
                            Login
                        </button>
                    </div>
            }
        </>
    )
}