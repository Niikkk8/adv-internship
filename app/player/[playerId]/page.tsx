"use client"

import axios from 'axios';
import { usePathname } from 'next/navigation';
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

export default function page() {
    const pathname = usePathname();
    const playerId = pathname.split('/').pop();
    const [loading, setLoading] = useState<boolean>(true);
    const [book, setBook] = useState<BookObject | undefined>();

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

    console.log(book);
    return (
        <div className='max-w-[1200px] mx-auto px-8 py-6'>
            <p className='whitespace-pre-line'>
                {book?.summary}
            </p>
        </div>
    )
}
