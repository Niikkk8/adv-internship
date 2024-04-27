import { closeLoginModal } from '@/redux/modalSlice';
import { Modal } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../firebase';
import { TbUserFilled } from 'react-icons/tb';

export default function LoginModal() {
    const isOpen = useSelector((state: any) => state.modals.loginModal);
    const [loginInterface, setLoginInterface] = useState<boolean>(true);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [signupFormData, setSignupFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    function toggleLogin() {
        setLoginInterface(!loginInterface);
    }

    async function handleSignInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Successfully signed in with Google:', user);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    }

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login form submitted:', loginFormData);
        setLoginFormData({ email: '', password: '' });
    };

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (signupFormData.email && signupFormData.password) {
            console.log('Signup form submitted:', signupFormData);
            setSignupFormData({ email: '', password: '' });
        } else {
            alert('Please enter both email and password');
        }
    };

    return (
        <Modal open={isOpen} onClose={() => dispatch(closeLoginModal())}>
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => dispatch(closeLoginModal())} />
                <div className='relative w-[50%] min-w-[280px] max-w-[400px] px-6 py-12 bg-white flex flex-col items-center justify-center rounded-lg'>
                    <CgClose onClick={() => dispatch(closeLoginModal())} size={20} className='absolute top-6 right-6 cursor-pointer' />
                    {loginInterface ? (
                        <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
                            <h1 className='text-center text-xl font-bold text-[#032b41] mb-4'>Log in to Summarist</h1>
                            <button className='flex items-center justify-between my-2 button-transform bg-[#3a579d] text-white p-2 rounded-md w-full'>
                                <TbUserFilled size={22} />
                                <p className='mr-6'>Login as a Guest</p>
                                <div />
                            </button>
                            <div className='flex items-center gap-6'><span className='h-[1px] bg-gray-400 w-[80%]' /><p className='text-gray-500'>or</p><span className='h-[1px] bg-gray-400 w-[80%]' /></div>
                            <button className='flex items-center justify-between my-2 button-transform bg-[#4285f4] text-white p-2 rounded-md w-full' onClick={handleSignInWithGoogle}>
                                <img src="/assets/google.png" className='w-[28px] p-1 rounded-full bg-white' alt="" />
                                <p className='mr-6'>Log In with Google</p>
                                <div />
                            </button>
                            <div className='flex items-center gap-6'><span className='h-[1px] bg-gray-400 w-[80%]' /><p className='text-gray-500'>or</p><span className='h-[1px] bg-gray-400 w-[80%]' /></div>
                            <input type="text" name="email" value={loginFormData.email} onChange={handleLoginInputChange} placeholder="Email" className='text-sm p-2 my-1 border-2 focus:border-summarist-green outline-none rounded-md' />
                            <input type="password" name="password" value={loginFormData.password} onChange={handleLoginInputChange} placeholder="Password" className='text-sm p-2 my-1 border-2 focus:border-summarist-green outline-none rounded-md' />
                            <button type="submit" className='button-transform bg-summarist-green my-4 p-2 rounded-md'>Log In</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit} className="flex flex-col w-full">
                            <h1 className='text-center text-xl font-bold text-[#032b41] mb-4'>Sign up to Summarist</h1>
                            <button className='flex items-center justify-between my-2 button-transform bg-[#4285f4] text-white p-2 rounded-md w-full' onClick={handleSignInWithGoogle}>
                                <img src="/assets/google.png" className='w-[28px] p-1 rounded-full bg-white' alt="" />
                                <p className='mr-6'>Sign In with Google</p>
                                <div />
                            </button>
                            <div className='flex items-center gap-6'><span className='h-[1px] bg-gray-400 w-[80%]' /><p className='text-gray-500'>or</p><span className='h-[1px] bg-gray-400 w-[80%]' /></div>
                            <input type="text" name="email" value={signupFormData.email} onChange={handleSignupInputChange} placeholder="Email" className='text-sm p-2 my-1 border-2 focus:border-summarist-green outline-none rounded-md' />
                            <input type="password" name="password" value={signupFormData.password} onChange={handleSignupInputChange} placeholder="Password" className='text-sm p-2 my-1 border-2 focus:border-summarist-green outline-none rounded-md' />
                            <button type="submit" className='button-transform bg-summarist-green my-4 p-2 rounded-md'>Sign Up</button>
                        </form>
                    )}
                    <button onClick={toggleLogin} className='absolute bottom-0 p-3 pt-4 text-blue-500 hover:bg-gray-300 w-full active:bg-blue-500 active:text-white'>
                        {loginInterface ? "Don't have an account?" : "Already have an account?"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}