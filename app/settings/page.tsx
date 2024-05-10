import React from 'react'

export default function page() {
    return (
        <div className='max-w-[1200px] mx-auto px-2 my-6'>
            <h1 className='py-4 border-b text-4xl font-semibold text-[#032b41]'>Settings</h1>
            <div className='py-4 border-b'>
                <h3 className='text-xl text-[#032b41] font-semibold'>Your subscription plan</h3>
                <p className='my-1'>Basic</p>
                <button className='bg-summarist-green py-2 px-4 rounded-lg my-2'>Upgrade to Premium</button>
            </div>
            <div className='my-4'>
                <h3 className='text-xl text-[#032b41] font-semibold'>Email</h3>
                <p>demoemail@gmail.com</p>
            </div>
        </div>
    )
}