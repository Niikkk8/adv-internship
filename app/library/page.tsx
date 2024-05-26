"use client"

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import BookCard from "@/components/BookCard";

interface BookObject {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}

interface UserState {
    userId: string | null;
    userEmail: string | null;
    userSubscriptionStatus: string | null;
    userSavedBooks: string[];
    userFinishedBooks: string[];
}

export default function Page() {
    const user = useAppSelector((state: { user: UserState }) => state.user);
    const [savedBooks, setSavedBooks] = useState<BookObject[]>([]);
    const [finishedBooks, setFinishedBooks] = useState<BookObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSavedBooks = async () => {
            try {
                const promises = user.userSavedBooks.map(async (bookId) => {
                    const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch book with ID: ${bookId}`);
                    }
                    return response.json();
                });

                const bookResponses = await Promise.all(promises);
                const bookData: BookObject[] = bookResponses.flat();
                setSavedBooks(bookData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching saved books:", error);
                setLoading(false);
            }
        };

        const fetchFinishedBooks = async () => {
            try {
                const promises = user.userFinishedBooks.map(async (bookId) => {
                    const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch book with ID: ${bookId}`);
                    }
                    return response.json();
                });

                const bookResponses = await Promise.all(promises);
                const bookData: BookObject[] = bookResponses.flat();
                setFinishedBooks(bookData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching saved books:", error);
                setLoading(false);
            }
        };

        if (user.userSavedBooks.length > 0) {
            setLoading(true);
            fetchSavedBooks();
        }

        if (user.userFinishedBooks.length > 0) {
            setLoading(true);
            fetchFinishedBooks();
        }
    }, [user.userSavedBooks, user.userFinishedBooks]);

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="my-6">
                <h1 className="text-[#032b41] font-semibold text-2xl">Saved Books</h1>
                <p className="my-2">{savedBooks.length} items</p>
                {loading ? (
                    <div className="flex overflow-x-scroll no-scrollbar w-full">
                        {new Array(6).fill(0).map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))}
                    </div>
                ) : savedBooks.length > 0 ? (
                    <div className="flex overflow-x-scroll no-scrollbar w-full">
                        {savedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto rounded-lg text-center p-8 bg-[#f1f6f4] w-fit">
                        <h2 className="text-[#031b41] font-semibold text-lg">Save your favourite books!</h2>
                        <p className="my-1">When you save a book, it will appear here.</p>
                    </div>
                )}
            </div>
            <div className="my-6">
                <h1 className="text-[#032b41] font-semibold text-2xl">Finished</h1>
                <p className="my-2">{user.userFinishedBooks.length} items</p>
                {loading ? (
                    <div className="flex overflow-x-scroll no-scrollbar w-full">
                        {new Array(6).fill(0).map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))}
                    </div>
                ) : finishedBooks.length > 0 ? (
                    <div className="flex overflow-x-scroll no-scrollbar w-full">
                        {finishedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto rounded-lg text-center p-8 bg-[#f1f6f4] w-fit">
                        <h2 className="text-[#031b41] font-semibold text-lg">Done and dusted!</h2>
                        <p className="my-1">When you finish a book, you can find it here later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
