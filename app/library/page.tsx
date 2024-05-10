import React from 'react'

export default function page() {
    return (
        <div className='max-w-[1200px] mx-auto px-4'>
            <div className='my-6'>
                <h1 className='text-[#032b41] font-semibold text-2xl'>Saved Books</h1>
                <p className='my-2'>0 items</p>
                <div className='mx-auto rounded-lg text-center p-8 bg-[#f1f6f4] w-fit'>
                    <h2 className='text-[#031b41] font-semibold text-lg'>Save your favourite books!</h2>
                    <p className='my-1'>When you save a book, it will appear here.</p>
                </div>
            </div>
            <div className='my-6'>
                <h1 className='text-[#032b41] font-semibold text-2xl'>Finished</h1>
                <p className='my-2'>0 items</p>
                <div className='mx-auto rounded-lg text-center p-8 bg-[#f1f6f4] w-fit'>
                    <h2 className='text-[#031b41] font-semibold text-lg'>Done and dusted!</h2>
                    <p className='my-1'>When you finish a book, you can find it here later.</p>
                </div>
            </div>
        </div>
    )
}
