import React from 'react';

export default function HomepageNavbar() {
  return (
    <div className='flex justify-between items-center py-6 max-w-[1000px] m-auto px-4'>
      <img src="/assets/logo.png" alt="" className='w-48' />
      <ul className='flex'>
        <li className='ml-6 cursor-not-allowed'>Login</li>
        <li className='ml-6 cursor-not-allowed hidden sm:inline'>About</li>
        <li className='ml-6 cursor-not-allowed hidden sm:inline'>Contact</li>
        <li className='ml-6 cursor-not-allowed hidden sm:inline'>Help</li>
      </ul>
    </div>
  );
}
