"use client"

import { checkoutPlan } from '@/actions/transaction.action';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'

export default function CheckoutButton(
    { title, para, plan, amount, userId }:
        { title: string, para: string, plan: string, amount: number, userId: string }
) {
    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }, []);

    const onCheckout = async () => {
        const transaction = {
            amount,
            plan,
            userId
        };

        await checkoutPlan(transaction);
    };
    return (
        <form action={onCheckout}>
            <div className='bg-white flex flex-col items-center sticky bottom-0 py-6'>
                <button className='bg-summarist-green py-2 px-8 w-[30%] min-w-fit mb-4 rounded-md'>{title}</button>
                <p className='text-xs text-gray-500'>{para}</p>
            </div>
        </form>
    )
}
