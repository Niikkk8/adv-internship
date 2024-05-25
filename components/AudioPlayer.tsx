import { db } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

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

const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function AudioPlayer() {
    const pathname = usePathname();
    const playerId: string = pathname.split("/").pop() || "";
    const [book, setBook] = useState<BookObject | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchBookAndAudio = async () => {
            try {
                const response = await axios.get<BookObject>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${playerId}`
                );
                setBook(response.data);
                setLoading(false);

                if (response.data.audioLink) {
                    fetchAudioDuration(response.data.audioLink);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (playerId) {
            fetchBookAndAudio();
        }
    }, [playerId]);

    const fetchAudioDuration = async (audioLink: string) => {
        try {
            const audio = new Audio(audioLink);
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
            });
        } catch (error) {
            console.error('Error fetching audio duration:', error);
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 10;
        }
    };

    const handleSkipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 10;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-[160px] bg-[#042330]">
            <div className="max-w-[1400px] mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4">
                <div className="flex items-center justify-center w-[80%] md:w-[30%]">
                    <Image src={book?.imageLink || ''} alt="" height={60} width={60} className="py-2" />
                    <div className="ml-2">
                        <h3 className="text-sm md:text-md text-white">{book?.title}</h3>
                        <h4 className="text-xs md:text-sm text-gray-300">{book?.author}</h4>
                    </div>
                </div>
                <audio
                    ref={audioRef}
                    src={book?.audioLink}
                    preload="metadata"
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                    onEnded={() => setIsPlaying(false)}
                />
                <Controls
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onSkipForward={handleSkipForward}
                    onSkipBackward={handleSkipBackward}
                />
                <ProgressBar
                    currentTime={currentTime}
                    duration={duration}
                    onProgressChange={handleProgressChange}
                    formatTime={formatTime}
                    playerId={playerId}
                />
            </div>
        </div>
    );
}

interface ControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onSkipForward: () => void;
    onSkipBackward: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    isPlaying,
    onPlayPause,
    onSkipForward,
    onSkipBackward,
}) => {
    return (
        <div className="flex justify-center items-center mb-2 text-white w-[80%] md:w-[30%]">
            <button className="p-2" onClick={onSkipBackward}>
                <TbRewindBackward10 size={24} />
            </button>
            <button className="p-2" onClick={onPlayPause}>
                {isPlaying ? <IoPauseSharp size={28} /> : <IoPlaySharp size={28} />}
            </button>
            <button className="p-2" onClick={onSkipForward}>
                <TbRewindForward10 size={24} />
            </button>
        </div>
    );
};

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatTime: (time: number) => string;
    playerId: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    currentTime,
    duration,
    onProgressChange,
    formatTime,
    playerId,
}) => {
    const user = useAppSelector((state: { user: UserState }) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const updateFinishedBooks = async () => {
            try {
                const userDocRef = doc(db, "users", user.userId!);
                await updateDoc(userDocRef, {
                    userFinishedBooks: arrayUnion(playerId)
                });
                dispatch(setUser({
                    ...user,
                    userFinishedBooks: [...user.userFinishedBooks, playerId]
                }));
            } catch (error) {
                console.error("Error updating user finished books:", error);
            }
        };

        if (Math.floor(currentTime) === Math.floor(duration) && !user.userFinishedBooks.includes(playerId)) {
            updateFinishedBooks();
        }
    }, [currentTime, duration, playerId, user, dispatch]);

    return (
        <div className="flex items-center w-[60%] md:w-[30%]">
            <span className="text-white">{formatTime(currentTime)}</span>
            <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={onProgressChange}
                className="mx-2 flex-1 accent-summarist-green"
            />
            <span className="text-white">{formatTime(duration)}</span>
        </div>
    );
};