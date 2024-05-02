import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function SearchBar() {
    return (
        <div className='border-b p-4 overflow-hidden'>
            <div className='w-full max-w-[1200px] mx-auto flex justify-end items-center'>
                <div className='border-2 rounded-lg flex justify-between items-center w-[50%] lg:w-[30%] min-w-40'>
                    <input type="text" placeholder='Search for books' className='text-sm w-full bg-transparent outline-none px-4 py-1' />
                    <BiSearch size={40} className='border-l-2 px-2 py-1' />
                </div>
                <RxHamburgerMenu size={28} className='ml-4 flex md:hidden'/>
            </div>
        </div>
    )
}