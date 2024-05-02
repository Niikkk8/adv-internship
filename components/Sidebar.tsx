import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiHighlight, BiLogOut } from 'react-icons/bi'
import { CiBookmark } from 'react-icons/ci'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { IoHomeOutline, IoSearchOutline, IoSettingsOutline } from 'react-icons/io5'

export default function Sidebar() {
    const router = usePathname();
    return (
        <div className='hidden md:flex flex-col justify-between h-screen border-r bg-[#f7faf9] min-w-fit'>
            <div>
                <div className='p-6'>
                    <img src='/assets/logo.png' className='w-40 h-10' alt='' />
                </div>
                <ul className='my-4'>
                    <li className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/for-you' && 'sidebar-active'}`}>
                        <Link href='/for-you'>
                            <span className='flex items-center space-x-2'>
                                <IoHomeOutline size={28} />
                                <h2 className='text-lg'>For You</h2>
                            </span>
                        </Link>
                    </li>
                    <li className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/library' ? 'sidebar-active' : ''}`}>
                        <Link href='/library'>
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
                    <li className={`flex items-center space-x-4 pl-6 pr-4 py-3 my-2 hover:bg-gray-200 ${router === '/settings' ? 'sidebar-active' : ''}`}>
                        <Link href='/settings'>
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
    )
}
