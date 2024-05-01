import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function SearchBar() {
    return (
        <div className='border-b w-full p-4 overflow-hidden'>
            <div className='w-full max-w-[1200px] mx-auto flex justify-end'>
                <div className='border-2 rounded-lg flex justify-between items-center w-[50%] lg:w-[25%] min-w-40'>
                    <input type="text" placeholder='Search for books' className='text-sm w-full bg-transparent outline-none p-2' />
                    <BiSearch size={40} className='border-l-2 p-2'/>
                </div>
            </div>
        </div>
    )
}