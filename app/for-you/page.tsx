"use client"

import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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
    const [recommendedBooks, setRecommendedBooks] = useState<BookObject[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<BookObject[]>([]);
    const [selectedBookLoading, setSelectedBookLoading] = useState<boolean>(true);
    const [recommendedBooksLoading, setRecommendedBooksLoading] = useState<boolean>(true);
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

        const fetchRecommendedBooks = async () => {
            try {
                const response = await axios.get<BookObject[]>('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
                setRecommendedBooks(response.data);
                setRecommendedBooksLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchSuggestedBooks = async () => {
            try {
                const response = await axios.get<BookObject[]>('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
                setSuggestedBooks(response.data);
                setSuggestedBooksLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSelectedBook();
        fetchRecommendedBooks();
        fetchSuggestedBooks();
    }, []);

    return (
        <div className='max-w-[1200px] mx-auto px-8 py-12'>
            {/* Selected for you */}
            <div className='mt-2'>
                <h1 className='font-bold text-2xl text-[#032b41]'>Selected just for you</h1>
                <Link href={`/book/${selectedBook?.id}`}>
                    <div className='bg-[#fbefd6] mt-4 flex flex-col md:flex-row p-4 w-full lg:w-[60%]'>
                        {selectedBookLoading ?
                            <>
                                <div className='md:w-[40%] px-4 py-2 mr-2'>
                                    <Skeleton sx={{ fontSize: '24px' }} />
                                </div>
                                <div className='flex md:border-l border-gray-500 pl-4 w-full'>
                                    <Skeleton variant='rectangular' width={140} height={160} animation="wave" />
                                    <div className='ml-2 w-[50%]'>
                                        <Skeleton sx={{ fontSize: '24px' }} />
                                        <Skeleton sx={{ fontSize: '18px' }} />
                                    </div>
                                </div>
                            </>
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
                </Link>
            </div>
            {/*Recommended for you*/}
            <div className='mt-6'>
                <h1 className='font-bold text-2xl text-[#032b41]'>Recommended For You</h1>
                <p className='mt-3 font-light'>We think you'll like these</p>
                {
                    recommendedBooksLoading ? (
                        <div className='mt-4 flex overflow-x-scroll no-scrollbar w-full'>
                            {
                                new Array(6).fill(0).map((_) => (
                                    <BookCardSkeleton />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='mt-4 flex overflow-x-scroll no-scrollbar w-full'>
                            {recommendedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )
                }
            </div>
            {/*Suggested For You*/}
            <div className='mt-6'>
                <h1 className='font-bold text-2xl text-[#032b41]'>Suggsted Books</h1>
                <p className='mt-3 font-light'>Browse those books</p>
                {
                    suggestedBooksLoading ? (
                        <div className='mt-4 flex overflow-x-scroll no-scrollbar w-full'>
                            {
                                new Array(6).fill(0).map((_) => (
                                    <BookCardSkeleton />
                                ))
                            }
                        </div>
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
