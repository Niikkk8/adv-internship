"use client"

import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
    const bookId = pathname.split('/').pop();
    const [loading, setLoading] = useState<boolean>(true);
    const [book, setBook] = useState<BookObject | undefined>(); // Change made here

    useEffect(() => {
        const fetchSelectedBook = async () => {
            try {
                const response = await axios.get<BookObject>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
                );
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (bookId) {
            fetchSelectedBook();
        }
    }, [bookId]);

    console.log(book);

    return (
        <>
            {loading ?
                <div>
                    Loading
                </div>
                :
                <div>
                    <p>{book?.title}</p>
                </div>
            }
        </>
    );
}
