'use client'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { CaretRightOutlined, PauseOutlined, MehOutlined, LockOutlined, MessageOutlined } from "@ant-design/icons";
import style from "@/styles/videoPlayer.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(style);
export default function Player({ link }) {


    const [videoDuration, setVideoDuration] = useState(0);
    const [triggerView, setTriggerView] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const play = null;
    const [volume, setVolume] = useState(1);
    const [cc, setCC] = useState(false);

    const playerRef = useRef(null);


    useEffect(() => {
        const videoStorageRef = ref(storage, `/video/videos/${link}`)
        getDownloadURL(videoStorageRef).then(url => setVideoFile(url))
    }, [])


    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === "Space" && e.target.tagName !== "INPUT") {
                e.preventDefault();
                e.target.value += " ";
                const video = playerRef.current;
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        };

        document.addEventListener("keydown", handleSpacebar);

        return () => {
            document.removeEventListener("keydown", handleSpacebar);
        };
    }, []);

    useEffect(() => {
        const videoElement = playerRef.current;

        const handleTimeUpdate = () => {
            const { currentTime, duration } = videoElement;
            const seventyFivePercent = duration * 0.75;
            if (currentTime >= seventyFivePercent && (triggerView == false)) {
                setTriggerView(true)
                axios.post('/api/video/increaseview', {
                    link: link
                })
            }
        }
        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [videoDuration, triggerView])


    const volumex = () => {
        if (volume > 0.5) {
            return <MessageOutlined />;
        } else if (volume > 0) {
            return <MehOutlined />;
        } else {
            return <LockOutlined />;
        }
    };

    const playPauseController = () => {
        if (playerRef.current) {
            playerRef.current.paused ? (
                <CaretRightOutlined
                    onClick={() => {
                        if (playerRef) {
                            playerRef.current.play();
                        }
                    }}
                />
            ) : (
                <PauseOutlined
                    onClick={() => {
                        if (playerRef) {
                            playerRef.current.pause();
                        }
                    }}
                />
            );
        }
    };

    const handleLoadedMetadata = () => {
        const { duration } = playerRef.current;
        setVideoDuration(duration);
    };

    return (
        <div className={cx("box")}>
            <div className={cx("frame-box")}>
                <video
                    className={cx("player")}
                    src={videoFile}
                    allowFullScreen
                    autoPlay
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                    ref={playerRef}
                ></video>
            </div>
        </div>
    )
}