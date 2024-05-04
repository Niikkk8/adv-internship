"use client"

import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaRegBookmark, FaRegClock } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { IoMicOutline } from 'react-icons/io5';
import { VscBook } from 'react-icons/vsc';

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
    const [book, setBook] = useState<BookObject | undefined>();

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
        <div className='max-w-[1200px] mx-auto px-8 py-6'>
            {loading ?
                <div>
                    Loading
                </div>
                :
                <div className='flex items-start'>
                    <div className='px-4'>
                        <div className='text-[#032b41] py-4 border-b'>
                            <h2 className='font-bold text-3xl'>{book?.title}</h2>
                            <h3 className='font-semibold mt-3'>{book?.author}</h3>
                            <p className='font-light text-xl mt-2'>{book?.subTitle}</p>
                        </div>
                        <div className='py-4 border-b flex items-center text-[#032b41]'>
                            <div className='mr-20'>
                                <p className='flex items-center text-sm font-semibold'>
                                    <CiStar size={26} />
                                    {book?.averageRating} ({book?.totalRating} ratings)
                                </p>
                                <p className='flex items-center text-sm font-semibold mt-3'>
                                    <IoMicOutline size={22} />
                                    {book?.type}
                                </p>
                            </div>
                            <div className='mr-20'>
                                <p className='flex items-center text-sm font-semibold'>
                                    <FaRegClock size={20} />
                                </p>
                                <p className='flex items-center text-sm font-semibold mt-3'>
                                    <HiOutlineLightBulb size={26} />
                                    {book?.keyIdeas} Key ideas
                                </p>
                            </div>
                        </div>
                        <div>
                            {/*CONVERT THESE BUTTONS TO LINKS LATER*/}
                            <div className='flex py-6'>
                                <button className='flex items-center mr-6 py-3 px-8 bg-[#032b41] text-white rounded-md'> <VscBook className='mr-2' size={22} /> Read </button>
                                <button className='flex items-center mr-6 py-3 px-8 bg-[#032b41] text-white rounded-md'> <IoMicOutline className='mr-2' size={22} /> Listen </button>
                            </div>
                            <button className='flex items-center text-[#0365f2] font-medium text-lg mb-8'> <FaRegBookmark className='mr-3' size={24}/> Add title to my library</button>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-[#032b41] mb-4'>What's it about?</h3>
                            <div className='flex'>
                                {book?.tags.map((tag) => <h4 className='mr-4 py-3 px-4 bg-[#f1f6f4] rounded-md text-[#032b41] font-medium'>{tag}</h4>)}
                            </div>
                            <p className='py-4'>{book?.bookDescription}</p>
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg text-[#032b41] mb-4'>About the author</h3>
                            <p>{book?.authorDescription}</p>
                        </div>
                    </div>
                    {book?.imageLink && (
                        <Image src={book?.imageLink} height={200} width={280} alt='' />
                    )}
                </div>
            }
        </div>
    );
}
