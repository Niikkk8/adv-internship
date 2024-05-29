"use client"

import React, { useState, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar, toggleSidebar } from '@/redux/sidebarSlice';
import { Skeleton, debounce } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.sidebar.isOpen);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSearchResults = async (query: string) => {
        if (!query) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedFetchSearchResults(value);
    };

    return (
        <div className='border-b p-4'>
            <div className='w-full max-w-[1200px] mx-auto flex justify-end items-center'>
                <div className='border-2 rounded-lg flex justify-between items-center w-[50%] lg:w-[30%] min-w-40 relative'>
                    <input
                        type='text'
                        placeholder='Search for books'
                        className='text-sm w-full bg-transparent outline-none px-4 py-1'
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    {
                        searchResults.length > 1 ?
                            <IoClose size={40} className='border-l-2 px-2 py-1 cursor-pointer' onClick={() => { setSearchValue(''); setSearchResults([]) }} />
                            :
                            <BiSearch size={40} className='border-l-2 px-2 py-1' />
                    }
                    <div>
                        {searchValue &&
                            <div className='mt-4 absolute top-12 left-0 z-50'>
                                {loading ?
                                    <>
                                        <div className='p-1 bg-white shadow-md rounded-md h-80 overflow-y-scroll'>
                                            {
                                                new Array(6).fill(0).map((_, index) => (
                                                    <Skeleton width={280} height={40} key={index} />
                                                ))
                                            }
                                        </div>
                                    </>
                                    :
                                    <>{searchResults.length > 1 &&
                                        <ul className='p-1 bg-white shadow-md rounded-md h-80 overflow-y-scroll'>
                                            {searchResults.map((result) => (
                                                <li key={result.id} className='border-b'>
                                                    <Link href={`/book/${result.id}`}>
                                                        <div className='m-2 flex items-center'>
                                                            <Image src={result.imageLink} alt='' height={100} width={75} />
                                                            <div className='text-[#032b41] ml-2'>
                                                                <h3 className='text-sm font-semibold'>{result.title}</h3>
                                                                <h4 className='text-xs font-medium'>{result.author}</h4>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    </>
                                }
                            </div>
                        }
                    </div>
                    {
                        isOpen ?
                            <IoClose
                                size={28}
                                className='ml-4 flex md:hidden cursor-pointer'
                                onClick={() => dispatch(closeSidebar())}
                            /> :
                            <RxHamburgerMenu
                                size={28}
                                className='ml-4 flex md:hidden cursor-pointer'
                                onClick={() => dispatch(toggleSidebar())}
                            />
                    }
                </div>
            </div>
        </div>
    );
}
