"use client"

import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaBookmark, FaRegBookmark, FaRegClock } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { IoMicOutline } from 'react-icons/io5';
import { VscBook } from 'react-icons/vsc';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { setUser } from '@/redux/userSlice';
import { db } from '@/firebase';
import { openLoginModal } from '@/redux/modalSlice';
import { Skeleton } from '@mui/material';

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

interface UserState {
    userId: string | null;
    userEmail: string | null;
    userSubscriptionStatus: string | null;
    userSavedBooks: string[];
    userFinishedBooks: string[];
}

const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
};

export default function Page() {
    const user = useAppSelector((state: { user: UserState }) => state.user);
    const dispatch = useAppDispatch()
    const pathname = usePathname();
    const bookId = pathname.split('/').pop();
    const [loading, setLoading] = useState<boolean>(true);
    const [book, setBook] = useState<BookObject | undefined>();
    const [audioDuration, setAudioDuration] = useState<number | null>(null);
    const [isInLibrary, setIsInLibrary] = useState<boolean>(
        user.userSavedBooks.includes(bookId || "")
    );
    const isUserSubscribed: boolean = user.userSubscriptionStatus != "Basic"
    const isPremium = !isUserSubscribed && book?.subscriptionRequired

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

    useEffect(() => {
        if (book && book.audioLink) {
            fetchAudioDuration(book.audioLink);
        }
    }, [book]);

    const fetchAudioDuration = async (audioLink: string) => {
        try {
            const audio = new Audio(audioLink);
            audio.addEventListener('loadedmetadata', () => {
                setAudioDuration(audio.duration);
            });
        } catch (error) {
            console.error('Error fetching audio duration:', error);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!user.userEmail) {
            event.preventDefault();
            event.stopPropagation();
            dispatch(openLoginModal());
        }
    };

    const removeFromLibrary = async () => {
        try {
            const userDocRef = doc(db, "users", user.userId!);
            await updateDoc(userDocRef, {
                userSavedBooks: arrayRemove(bookId),
            });
            dispatch(
                setUser({
                    ...user,
                    userSavedBooks: user.userSavedBooks.filter((id) => id !== bookId),
                })
            );
            setIsInLibrary(false)
        } catch (error) {
            console.error("Error updating user saved books:", error);
        }
    }

    const addToLibrary = async () => {
        try {
            const userDocRef = doc(db, "users", user.userId!);
            await updateDoc(userDocRef, {
                userSavedBooks: arrayUnion(bookId)
            });
            dispatch(setUser({
                ...user,
                userSavedBooks: [...user.userSavedBooks, bookId]
            }));
            setIsInLibrary(true)
        } catch (error) {
            console.error("Error updating user saved books:", error);
        }
    }

    return (
        <div className='max-w-[1200px] mx-auto px-8 py-6'>
            {
                loading ?
                    <div className='flex flex-col-reverse items-center lg:flex-row lg:items-start'>
                        <div className='px-4 w-[70%]'>
                            <div className='text-[#032b41] py-4 border-b'>
                                <Skeleton animation="wave" height={60} className='w-[50%]' />
                                <Skeleton animation="wave" height={30} className='w-[20%]'/>
                                <Skeleton animation="wave" height={40} className='w-[30%]'/>
                            </div>
                            <div className='py-4 border-b flex items-center text-[#032b41]'>
                                <div className='mr-20'>
                                    <p className='flex items-center text-sm font-semibold'>
                                        <Skeleton animation="wave" variant='circular' width={20} />
                                        <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                    </p>
                                    <p className='flex items-center text-sm font-semibold mt-3'>
                                        <Skeleton animation="wave" variant='circular' width={20} />
                                        <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                    </p>
                                </div>
                                <div className='mr-20'>
                                    <p className='flex items-center text-sm font-semibold'>
                                        <Skeleton animation="wave" variant='circular' width={20} />
                                        <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                    </p>
                                    <p className='flex items-center text-sm font-semibold mt-3'>
                                        <Skeleton animation="wave" variant='circular' width={20} />
                                        <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className='flex py-4'>
                                    <Skeleton animation="wave" height={30} width={60} />
                                    <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                </div>
                                <Skeleton animation="wave" height={40} width={200} />
                            </div>
                            <div>
                                <Skeleton animation="wave" height={30} width={150} />
                                <div className='flex'>
                                    <Skeleton animation="wave" height={30} width={60} />
                                    <Skeleton animation="wave" height={30} width={60} className='ml-2' />
                                </div>
                                <Skeleton animation="wave" height={200} className='w-[80%]' />
                            </div>
                            <div>
                                <Skeleton animation="wave" height={30} width={150} />
                                <Skeleton animation="wave" height={200} className='w-[80%]' />
                            </div>
                        </div>
                        <Skeleton animation="wave" height={400} width={200} />
                    </div>
                    :
                    <div className='flex flex-col-reverse items-center lg:flex-row lg:items-start'>
                        <div className='px-4'>
                            <div className='text-[#032b41] py-4 border-b'>
                                <h2 className='font-bold text-3xl'>
                                    {book?.title}
                                    {isPremium && " (Premium)"}
                                </h2>
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
                                        <FaRegClock size={20} className='mr-1' />
                                        {audioDuration && formatTime(audioDuration)}
                                    </p>
                                    <p className='flex items-center text-sm font-semibold mt-3'>
                                        <HiOutlineLightBulb size={26} />
                                        {book?.keyIdeas} Key ideas
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className='flex py-6'>
                                    <Link
                                        href={isPremium ? `/choose-plan` : `/player/${book?.id}`}
                                        onClick={handleClick}
                                        className='flex items-center mr-6 py-3 px-8 bg-[#032b41] text-white rounded-md'
                                    >
                                        <VscBook className='mr-2' size={22} />
                                        Read
                                    </Link>
                                    <Link
                                        href={isPremium ? `/choose-plan` : `/player/${book?.id}`}
                                        onClick={handleClick}
                                        className='flex items-center mr-6 py-3 px-8 bg-[#032b41] text-white rounded-md'
                                    >
                                        <IoMicOutline className='mr-2' size={22} />
                                        Listen
                                    </Link>
                                </div>
                                {isInLibrary ?
                                    <button className='flex items-center text-[#0365f2] font-medium text-lg mb-8' onClick={removeFromLibrary}>
                                        <FaBookmark className='mr-3' size={24} /> Saved In My Library
                                    </button>
                                    :
                                    <button className='flex items-center text-[#0365f2] font-medium text-lg mb-8' onClick={addToLibrary}>
                                        <FaRegBookmark className='mr-3' size={24} /> Add title to my library
                                    </button>
                                }
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-[#032b41] mb-4'>What's it about?</h3>
                                <div className='flex'>
                                    {book?.tags.map((tag) => <h4 className='mr-4 py-3 px-4 bg-[#f1f6f4] rounded-md text-[#032b41] font-medium cursor-not-allowed'>{tag}</h4>)}
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
    )
}