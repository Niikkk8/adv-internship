import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar, toggleSidebar } from '@/redux/sidebarSlice';
import { IoClose } from 'react-icons/io5';

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.sidebar.isOpen);

    return (
        <div className='border-b p-4 overflow-hidden'>
            <div className='w-full max-w-[1200px] mx-auto flex justify-end items-center'>
                <div className='border-2 rounded-lg flex justify-between items-center w-[50%] lg:w-[30%] min-w-40'>
                    <input
                        type='text'
                        placeholder='Search for books'
                        className='text-sm w-full bg-transparent outline-none px-4 py-1'
                    />
                    <BiSearch size={40} className='border-l-2 px-2 py-1' />
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
    );
}
