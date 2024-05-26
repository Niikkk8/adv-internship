import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaRegClock } from 'react-icons/fa';

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

const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
};

const BookCard: React.FC<{ book: BookObject }> = ({ book }) => {
    const [audioDuration, setAudioDuration] = useState<number | null>(null);

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

    return (
        <div className='min-w-[40%] max-w-[40%] sm:min-w-[25%] sm:max-w-[30%] lg:min-w-[18%] lg:max-w-[20%] mx-2 p-2 pb-4 pt-6 hover:bg-[#f1f6f4] rounded-lg'>
            <Link href={`/book/${book.id}`}>
                <Image src={book.imageLink} height={180} width={180} alt='' />
                <h2 className='font-bold mt-2'>{book.title}</h2>
                <p className='text-sm font-light mt-2'>{book.author}</p>
                <p className='text-sm mt-1'>{book.subTitle}</p>
                <p className='flex items-center text-sm text-gray-500 mt-2'>
                    <CiStar />
                    {book.averageRating}
                    <FaRegClock className='ml-2 mr-1' />
                    {audioDuration && formatTime(audioDuration)}
                </p>
            </Link>
        </div>
    );
}

export default BookCard;
