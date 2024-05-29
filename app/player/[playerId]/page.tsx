"use client"

import { useAppSelector } from '@/redux/hooks';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface BookObject {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}

export default function Page() {
    const pathname = usePathname();
    const router = useRouter();
    const playerId = pathname.split('/').pop();
    const [loading, setLoading] = useState<boolean>(true);
    const [book, setBook] = useState<BookObject | undefined>();
    const userStatus = useAppSelector((state) => state.user.userSubscriptionStatus);

    useEffect(() => {
        const fetchSelectedBook = async () => {
            try {
                const response = await axios.get<BookObject>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${playerId}`
                );
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (playerId) {
            fetchSelectedBook();
        }
    }, [playerId]);

    useEffect(() => {
        if (userStatus === "Basic" && book?.subscriptionRequired) {
            router.push("/choose-plan");
        }
    }, [userStatus, router]);

    return (
        <div className='max-w-[1200px] mx-auto px-8 py-6 pb-20 h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] overflow-y-scroll no-scrollbar'>
            {
                loading ?
                    <>
                        <Skeleton animation="wave" width={240} className='py-4' />
                        <div className='border-b mb-2' />
                        <Skeleton height={300} className='w-[80%}' />
                    </>
                    :
                    <>
                        <h2 className='py-4 border-b text-2xl font-bold text-[#032b41]'>{book?.title}</h2>
                        <p className='whitespace-pre-line py-4'>
                            {book?.summary}
                        </p>
                    </>
            }
        </div>
    );
}
