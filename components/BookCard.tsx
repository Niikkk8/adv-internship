import Image from 'next/image';
import React from 'react';
import { CiStar } from 'react-icons/ci';

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

const BookCard: React.FC<{ book: BookObject }> = ({ book }) => {
    return (
        <div className='min-w-[40%] sm:min-w-[25%] lg:min-w-[18%] mx-2 p-2 pb-4 pt-6 hover:bg-[#f1f6f4] rounded-lg'>
            <Image src={book.imageLink} height={180} width={180} alt='' />
            <h2 className='font-bold mt-2'>{book.title}</h2>
            <p className='text-sm font-light mt-2'>{book.author}</p>
            <p className='text-sm mt-1'>{book.subTitle}</p>
            <p className='flex items-center text-sm text-gray-500 mt-2'>
                <CiStar />
                {book.averageRating}
            </p>
        </div>
    );
}

export default BookCard;
