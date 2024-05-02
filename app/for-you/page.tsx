"use client"

import BookCard from '@/components/BookCard';
import axios from 'axios';
import Image from 'next/image';
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
    const [selectedBook, setSelectedBook] = useState<BookObject>();
    const [suggestedBooks, setSuggestedBooks] = useState<BookObject[]>([]);
    const [selectedBookLoading, setSelectedBookLoading] = useState<boolean>(true);
    const [suggestedBooksLoading, setSuggestedBooksLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSelectedBook = async () => {
            try {
                const response = await axios.get<BookObject[]>('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
                setSelectedBook(response.data[0]);
                setSelectedBookLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchSuggestedBooks = async () => {
            try {
                const response = await axios.get<BookObject[]>('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
                setSuggestedBooks(response.data);
                setSuggestedBooksLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSelectedBook();
        fetchSuggestedBooks();
    }, []);

    return (
        <div className='max-w-[1200px] mx-auto px-8 py-4'>
            {/* Selected for you */}
            <div className='mt-8'>
                <h1 className='font-bold text-2xl text-[#032b41]'>Selected just for you</h1>
                <div className='bg-[#fbefd6] mt-4 flex flex-col md:flex-row p-4 w-full lg:w-[60%]'>
                    {selectedBookLoading ?
                        <div>Loading</div>
                        :
                        <>
                            <p className='text-sm md:w-[40%] px-4 py-2'>{selectedBook?.subTitle}</p>
                            <div className='flex md:border-l border-gray-500 pl-4'>
                                {selectedBook?.imageLink &&
                                    <Image src={selectedBook?.imageLink} width={160} height={160} alt='Selected Book Image' />
                                }
                                <div className='ml-2'>
                                    <h2 className='font-bold'>{selectedBook?.title}</h2>
                                    <p className='text-sm'>{selectedBook?.author}</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {/*Recommended for you*/}
            <div className='mt-6'>
                <h1 className='font-bold text-2xl text-[#032b41]'>Recommended For You</h1>
                <p className='mt-3 font-light'>We think you'll like these</p>
                {
                    suggestedBooksLoading ? (
                        <div>Loading</div>
                    ) : (
                        <div className='mt-4 flex overflow-x-scroll no-scrollbar w-full'>
                            {suggestedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )
                }
            </div>
        </div >
    );
}
