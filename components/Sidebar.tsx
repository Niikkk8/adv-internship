import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiHighlight, BiLogOut } from 'react-icons/bi';
import { CiBookmark } from 'react-icons/ci';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { IoHomeOutline, IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeSidebar } from '@/redux/sidebarSlice';

export default function Sidebar() {
    const router = usePathname();
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.sidebar.isOpen);

    return (
        <div
            className={`fixed h-screen min-w-fit z-30 md:relative md:flex md:z-auto flex-col justify-between border-r bg-[#f7faf9] w-fit transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className='p-6'>
                        <img src='/assets/logo.png' className='w-40 h-10' alt='' />
                    </div>
                    <ul className='my-4'>
                        <li
                            className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/for-you' && 'sidebar-active'}`}
                        >
                            <Link href='/for-you' onClick={() => dispatch(closeSidebar())}>
                                <span className='flex items-center space-x-2'>
                                    <IoHomeOutline size={28} />
                                    <h2 className='text-lg'>For You</h2>
                                </span>
                            </Link>
                        </li>
                        <li
                            className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/library' ? 'sidebar-active' : ''}`}
                        >
                            <Link href='/library' onClick={() => dispatch(closeSidebar())}>
                                <span className='flex items-center space-x-2'>
                                    <CiBookmark size={28} />
                                    <h2 className='text-lg'>My Library</h2>
                                </span>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 pl-6 pr-4 py-3 my-2 cursor-not-allowed'>
                            <BiHighlight size={28} />
                            <h2 className='text-lg'>Highlights</h2>
                        </li>
                        <li className='flex items-center space-x-4 pl-6 pr-4 py-3 my-2 cursor-not-allowed'>
                            <IoSearchOutline size={28} />
                            <h2 className='text-lg'>Search</h2>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='my-4'>
                        <li
                            className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/settings' ? 'sidebar-active' : ''}`}
                        >
                            <Link href='/settings' onClick={() => dispatch(closeSidebar())}>
                                <span className='flex items-center space-x-2'>
                                    <IoSettingsOutline size={28} />
                                    <h2 className='text-lg'>Settings</h2>
                                </span>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 pl-6 pr-4 py-3 my-2 cursor-not-allowed'>
                            <IoMdHelpCircleOutline size={28} />
                            <h2 className='text-lg'>Help & Support</h2>
                        </li>
                        <li className='flex items-center space-x-4 pl-6 pr-4 py-3 my-2 cursor-not-allowed'>
                            <BiLogOut size={28} />
                            <h2 className='text-lg'>Logout</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
