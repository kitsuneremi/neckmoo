'use client'
import React, { useEffect, useRef, useState } from "react";
import Plyr, { PlyrProps, PlyrInstance } from "plyr-react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import axios from "axios";

const Player = ({ link }) => {
    const videoRef = useRef(null);
    const [url, setUrl] = useState<string>("")
    // useEffect(() => {
    //     getDownloadURL(ref(storage, `video/videos/${link}`)).then(res => setUrl(res))
    // }, [])

    useEffect(() => {
        const loadVideo = async () => {
            const video = document.getElementById("plyr") as HTMLVideoElement;
            var hls = new Hls();
            hls.loadSource("http://localhost:5000/api/merge/MWzAXYBg/playlist.m3u8");
            hls.attachMedia(video);
            // @ts-ignore
            videoRef.current!.plyr.media = video;

            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                (videoRef.current!.plyr as PlyrInstance).play();
            });
        };
        loadVideo();
    });

    return (
        <div>
            <Plyr ref={videoRef} source={{} as PlyrProps["source"]} id="plyr" />
        </div>
    );
};

export default Player;





// useEffect(() => {
//     const handleSpacebar = (e) => {
//         if (e.code === "Space" && e.target.tagName !== "INPUT") {
//             e.preventDefault();
//             e.target.value += " ";
//             const video = playerRef.current;
//             if (video.paused) {
//                 video.play();
//             } else {
//                 video.pause();
//             }
//         }
//     };

//     document.addEventListener("keydown", handleSpacebar);

//     return () => {
//         document.removeEventListener("keydown", handleSpacebar);
//     };
// }, []);

// useEffect(() => {
//     const videoElement = playerRef.current;

//     const handleTimeUpdate = () => {
//         const { currentTime, duration } = videoElement;
//         const seventyFivePercent = duration * 0.75;
//         if (currentTime >= seventyFivePercent && (triggerView == false)) {
//             setTriggerView(true)
//             axios.post('/api/video/increaseview', {
//                 link: link
//             })
//         }
//     }
//     videoElement.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//         videoElement.removeEventListener('timeupdate', handleTimeUpdate);
//     };
// }, [videoDuration, triggerView])





// useEffect(() => {
//     axios.get(`/api/video/findbylink`, {
//         params: {
//             link: link
//         }
//     }).then(res => { setVideoData(res.data); })
// }, [link])