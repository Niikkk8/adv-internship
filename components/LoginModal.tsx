import { closeLoginModal } from '@/redux/modalSlice';
import { Modal } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../firebase';

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
                <div className='relative w-[50%] p-8 bg-white flex flex-col items-center justify-center'>
                    <CgClose onClick={() => dispatch(closeLoginModal())} className='absolute top-6 right-6 cursor-pointer' />

                    {loginInterface ? (
                        <form onSubmit={handleLoginSubmit} className="form">
                            <h1>Log in to Summarist</h1>
                            <button>Login as a Guest</button>
                            <div><span /><p>or</p><span /></div>
                            <button type="button" onClick={handleSignInWithGoogle}>Sign In with Google</button>
                            <div><span /><p>or</p><span /></div>
                            <input type="text" name="email" value={loginFormData.email} onChange={handleLoginInputChange} placeholder="Email" />
                            <input type="password" name="password" value={loginFormData.password} onChange={handleLoginInputChange} placeholder="Password" />
                            <button type="submit">Log In</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit} className="form">
                            <h1>Sign up to Summarist</h1>
                            <button type="button" onClick={handleSignInWithGoogle}>Sign In with Google</button>
                            <div><span /><p>or</p><span /></div>
                            <input type="text" name="email" value={signupFormData.email} onChange={handleSignupInputChange} placeholder="Email" />
                            <input type="password" name="password" value={signupFormData.password} onChange={handleSignupInputChange} placeholder="Password" />
                            <button type="submit">Sign Up</button>
                        </form>
                    )}
                    <button onClick={toggleLogin}>
                        {loginInterface ? "Don't have an account?" : "Already have an account?"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
