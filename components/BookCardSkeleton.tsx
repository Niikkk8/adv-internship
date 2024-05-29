import { Skeleton } from '@mui/material'
import React from 'react'

export default function BookCardSkeleton() {
    return (
        <div className='min-w-[40%] sm:min-w-[25%] lg:min-w-[18%] mx-2 p-2 pb-4 pt-6 hover:bg-[#f1f6f4] rounded-lg'>
            <Skeleton variant='rectangular' className='w-full' height={180} animation="wave" />
            <Skeleton animation="wave" sx={{ fontSize: '24px' }} />
            <Skeleton animation="wave" sx={{ fontSize: '14px' }} className='w-[50%]' />
            <Skeleton animation="wave" sx={{ fontSize: '18px' }} />
            <p className='flex items-center text-sm text-gray-500 mt-2'>
                <Skeleton animation="wave" variant='circular' width={20} className='' />
                <Skeleton animation="wave" sx={{ fontSize: '18px' }} className='w-[20%] ml-1' />
                <Skeleton animation="wave" variant='circular' width={20} className='ml-1' />
                <Skeleton animation="wave" sx={{ fontSize: '18px' }} className='w-[20%] ml-1' />
            </p>
        </div>
    )
}
