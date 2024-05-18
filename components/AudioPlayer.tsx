import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from "react-icons/io5";

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

export default function AudioPlayer() {
    const pathname = usePathname();
    const playerId = pathname.split("/").pop();
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
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (playerId) {
            fetchBookAndAudio();
        }
    }, [playerId]);

    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            if (audio) {
                setCurrentTime(audio.currentTime);
            }
        };
        const handleLoadedMetadata = () => {
            if (audio) {
                setDuration(audio.duration);
            }
        };
        const handleLoadedData = () => {
            setTimeout(() => {
                if (audio) {
                    setCurrentTime(audio.currentTime);
                }
            }, 100); // Delay of 100ms to ensure currentTime is accurate
        };
        const handleSeeked = () => {
            setTimeout(() => {
                if (audio) {
                    setCurrentTime(audio.currentTime);
                }
            }, 100); // Delay of 100ms to ensure currentTime is accurate
        };
        const handleAudioEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };
        if (audio) {
            audio.addEventListener("timeupdate", handleTimeUpdate);
            audio.addEventListener("loadedmetadata", handleLoadedMetadata);
            audio.addEventListener("loadeddata", handleLoadedData);
            audio.addEventListener("seeked", handleSeeked);
            audio.addEventListener("ended", handleAudioEnded);
        }
        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", handleTimeUpdate);
                audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audio.removeEventListener("loadeddata", handleLoadedData);
                audio.removeEventListener("seeked", handleSeeked);
                audio.removeEventListener("ended", handleAudioEnded);
            }
        };
    }, []);

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
        if (audioRef.current && audioRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        if (minutes === 0 && seconds === 0) {
            return "0:00"; // Handle the case when time is 0 seconds
        }
        return `${minutes}:${formattedSeconds}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="!h-[120px] bg-[#042330] flex flex-col items-center justify-center">
            {book && (
                <>
                    <audio ref={audioRef} src={book.audioLink} preload="metadata" />
                    <Controls
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        currentTime={currentTime}
                        duration={duration}
                        onProgressChange={handleProgressChange}
                        formatTime={formatTime}
                    />
                </>
            )}
        </div>
    );
}

interface ControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    currentTime: number;
    duration: number;
    onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatTime: (time: number) => string;
}

const Controls: React.FC<ControlsProps> = ({
    isPlaying,
    onPlayPause,
    currentTime,
    duration,
    onProgressChange,
    formatTime,
}) => {
    return (
        <div className="controls-wrapper flex flex-col items-center">
            <div className="controls flex items-center mb-2">
                <button className="p-2">
                    <IoPlaySkipBackSharp />
                </button>
                <button className="p-2">
                    <IoPlayBackSharp />
                </button>
                <button className="p-2" onClick={onPlayPause}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                <button className="p-2">
                    <IoPlayForwardSharp />
                </button>
                <button className="p-2">
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
            <div className="w-full flex items-center">
                <span className="text-white">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={onProgressChange}
                    className="mx-2 flex-1"
                />
                <span className="text-white">{formatTime(duration)}</span>
            </div>
        </div>
    );
};