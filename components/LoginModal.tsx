"use client";

import { closeLoginModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import {
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { auth, db, provider } from "../firebase";
import { TbUserFilled } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setUser, signOutUser } from "@/redux/userSlice";
import { usePathname, useRouter } from "next/navigation";

const isMobileDevice = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function LoginModal() {
    const isOpen = useAppSelector((state) => state.modals.loginModal);
    const [loginInterface, setLoginInterface] = useState<boolean>(true);
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
    const [signupFormData, setSignupFormData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [signupError, setSignupError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    function toggleLogin() {
        setLoginInterface(!loginInterface);
    }

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        dispatch(
                            setUser({
                                userEmail: userData.userEmail,
                                userSubscriptionStatus: userData.userSubscriptionStatus,
                                userSavedBooks: userData.userSavedBooks,
                                userFinishedBooks: userData.userFinishedBooks,
                                userId: userData.userId,
                            })
                        );
                        if (pathname === "/") {
                            router.push("/for-you");
                        }
                    } else {
                        console.log("User data not found in Firestore");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                dispatch(signOutUser());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    async function handleSignInWithGoogle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            if (isMobileDevice()) {
                await signInWithRedirect(auth, provider);
            } else {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("Successfully signed in with Google:", user);
                await handleUserAuthentication(user);
                dispatch(closeLoginModal());
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    const handleUserAuthentication = async (user: any) => {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            dispatch(
                setUser({
                    userId: userData.userId,
                    userEmail: userData.userEmail,
                    userSubscriptionStatus: userData.userSubscriptionStatus,
                    userSavedBooks: userData.userSavedBooks,
                    userFinishedBooks: userData.userFinishedBooks,
                })
            );
            console.log("User data fetched from Firestore:", userData);
        } else {
            await setDoc(userDocRef, {
                userId: user.uid,
                userEmail: user.email,
                userSubscriptionStatus: "basic",
                userSavedBooks: [],
                userFinishedBooks: [],
            });
            console.log("New user added to Firestore");
            dispatch(
                setUser({
                    userId: user.uid,
                    userEmail: user.email,
                    userSubscriptionStatus: "basic",
                    userSavedBooks: [],
                    userFinishedBooks: [],
                })
            );
            router.push("/for-you");
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null); // Reset previous errors
        if (loginFormData.email && loginFormData.password) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    loginFormData.email,
                    loginFormData.password
                );
                const user = userCredential.user;
                console.log("User signed in:", user);
                setLoginFormData({ email: "", password: "" });
                dispatch(closeLoginModal());
                router.push("/for-you");
            } catch (error: any) {
                switch (error.code) {
                    case "auth/invalid-email":
                        setLoginError("Invalid email address.");
                        break;
                    case "auth/user-not-found":
                        setLoginError("User not found.");
                        break;
                    case "auth/wrong-password":
                        setLoginError("Incorrect password.");
                        break;
                    default:
                        setLoginError("Error signing in.");
                }
                console.error("Error signing in: ", error);
            }
        } else {
            alert("Please enter both email and password");
        }
    };

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError(null); // Reset previous errors
        if (signupFormData.email && signupFormData.password) {
            try {
                const authResult = await createUserWithEmailAndPassword(
                    auth,
                    signupFormData.email,
                    signupFormData.password
                );
                const user = authResult.user;
                console.log("User signed up:", user);
                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, {
                    userId: user.uid,
                    userEmail: signupFormData.email,
                    userSubscriptionStatus: "basic",
                    userSavedBooks: [],
                    userFinishedBooks: [],
                });
                console.log("New user added to Firestore");
                dispatch(
                    setUser({
                        userId: user.uid,
                        userEmail: signupFormData.email,
                        userSubscriptionStatus: "basic",
                        userSavedBooks: [],
                        userFinishedBooks: [],
                    })
                );
                dispatch(closeLoginModal());
                setSignupFormData({ email: "", password: "" });
                router.push("/for-you");
            } catch (error: any) {
                switch (error.code) {
                    case "auth/invalid-email":
                        setSignupError("Invalid email address.");
                        break;
                    case "auth/weak-password":
                        setSignupError("Password is too short.");
                        break;
                    default:
                        setSignupError("Error creating account.");
                }
                console.error("Error creating user or adding document: ", error);
            }
        } else {
            alert("Please enter both email and password");
        }
    };

    return (
        <Modal open={isOpen} onClose={() => dispatch(closeLoginModal())}>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
                    onClick={() => dispatch(closeLoginModal())}
                />
                <div className="relative w-[50%] min-w-[280px] max-w-[400px] px-6 py-12 bg-white flex flex-col items-center justify-center rounded-lg">
                    <CgClose
                        onClick={() => dispatch(closeLoginModal())}
                        size={20}
                        className="absolute cursor-pointer top-6 right-6"
                    />
                    {loginInterface ? (
                        <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
                            <h1 className="text-center text-xl font-bold text-[#032b41] mb-4">
                                Log in to Summarist
                            </h1>
                            <button className="flex items-center justify-between my-2 button-transform bg-[#3a579d] text-white p-2 rounded-md w-full">
                                <TbUserFilled size={22} />
                                <p className="mr-6">Login as a Guest</p>
                                <div />
                            </button>
                            <div className="flex items-center gap-6">
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                                <p className="text-gray-500">or</p>
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                            </div>
                            <button
                                className="flex items-center justify-between my-2 button-transform bg-[#4285f4] text-white p-2 rounded-md w-full"
                                onClick={handleSignInWithGoogle}
                            >
                                <img
                                    src="/assets/google.png"
                                    className="w-[28px] p-1 rounded-full bg-white"
                                    alt=""
                                />
                                <p className="mr-6">Log In with Google</p>
                                <div />
                            </button>
                            <div className="flex items-center gap-6">
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                                <p className="text-gray-500">or</p>
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={loginFormData.email}
                                onChange={handleLoginInputChange}
                                placeholder="Email"
                                className="p-2 my-1 text-sm border-2 rounded-md outline-none focus:border-summarist-green"
                            />
                            <input
                                type="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleLoginInputChange}
                                placeholder="Password"
                                className="p-2 my-1 text-sm border-2 rounded-md outline-none focus:border-summarist-green"
                            />
                            {loginError && (
                                <p className="text-red-500 text-sm mt-1">{loginError}</p>
                            )}
                            <button
                                type="submit"
                                className="p-2 my-4 rounded-md button-transform bg-summarist-green"
                            >
                                Log In
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit} className="flex flex-col w-full">
                            <h1 className="text-center text-xl font-bold text-[#032b41] mb-4">
                                Sign up to Summarist
                            </h1>
                            <button
                                className="flex items-center justify-between my-2 button-transform bg-[#4285f4] text-white p-2 rounded-md w-full"
                                onClick={handleSignInWithGoogle}
                            >
                                <img
                                    src="/assets/google.png"
                                    className="w-[28px] p-1 rounded-full bg-white"
                                    alt=""
                                />
                                <p className="mr-6">Sign In with Google</p>
                                <div />
                            </button>
                            <div className="flex items-center gap-6">
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                                <p className="text-gray-500">or</p>
                                <span className="h-[1px] bg-gray-400 w-[80%]" />
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={signupFormData.email}
                                onChange={handleSignupInputChange}
                                placeholder="Email"
                                className="p-2 my-1 text-sm border-2 rounded-md outline-none focus:border-summarist-green"
                            />
                            <input
                                type="password"
                                name="password"
                                value={signupFormData.password}
                                onChange={handleSignupInputChange}
                                placeholder="Password"
                                className="p-2 my-1 text-sm border-2 rounded-md outline-none focus:border-summarist-green"
                            />
                            {signupError && (
                                <p className="text-red-500 text-sm mt-1">{signupError}</p>
                            )}
                            <button
                                type="submit"
                                className="p-2 my-4 rounded-md button-transform bg-summarist-green"
                            >
                                Sign Up
                            </button>
                        </form>
                    )}
                    <button
                        onClick={toggleLogin}
                        className="absolute bottom-0 w-full p-3 pt-4 text-blue-500 hover:bg-gray-300 active:bg-blue-400 active:text-white"
                    >
                        {loginInterface ? "Don't have an account?" : "Already have an account?"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
