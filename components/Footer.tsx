import React from 'react'

export default function Footer() {
    return (
        <div className='bg-[#f1f6f4]'>
            <div className='max-w-[1000px] m-auto px-4 py-16'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div>
                        <h2 className='font-extrabold text-lg text-[#]'>Actions</h2>
                        <ul>
                            <li className='text-sm text-[#394547] my-1'>Summarist Magazine</li>
                            <li className='text-sm text-[#394547] my-1'>Cancel Subscription</li>
                            <li className='text-sm text-[#394547] my-1'>Help</li>
                            <li className='text-sm text-[#394547] my-1'>Contact us</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-extrabold text-lg text-[#]'>Useful Links</h2>
                        <ul>
                            <li className='text-sm text-[#394547] my-1'>Pricing</li>
                            <li className='text-sm text-[#394547] my-1'>Summarist Business</li>
                            <li className='text-sm text-[#394547] my-1'>Gift Cards</li>
                            <li className='text-sm text-[#394547] my-1'>Authors and Publishers</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-extrabold text-lg text-[#]'>Company</h2>
                        <ul>
                            <li className='text-sm text-[#394547] my-1'>About</li>
                            <li className='text-sm text-[#394547] my-1'>Careers</li>
                            <li className='text-sm text-[#394547] my-1'>Partners</li>
                            <li className='text-sm text-[#394547] my-1'>Code of Conduct</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-extrabold text-lg text-[#]'>Other</h2>
                        <ul>
                            <li className='text-sm text-[#394547] my-1'>Sitemap</li>
                            <li className='text-sm text-[#394547] my-1'>Legal Notice</li>
                            <li className='text-sm text-[#394547] my-1'>Terms of Service</li>
                            <li className='text-sm text-[#394547] my-1'>Privacy Policies</li>
                        </ul>
                    </div>
                </div>
                <h2 className='text-center text-lg mt-12 font-semibold'>Copyright &#xa9; 2024 Summarist</h2>
            </div>
        </div>
    )
}
