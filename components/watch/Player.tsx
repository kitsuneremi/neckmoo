'use client'
import React, { useEffect, useRef, useState } from "react";
import Plyr, { PlyrProps, PlyrInstance } from "plyr-react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

type defaultOption = {
    controls?: string[]
    qualitys?: {
        default: number,
        options: number[],
        forced: boolean,
        onChange: Function
    }
}

const Player = ({ link }) => {
    const videoRef = useRef(null);

    const [qua, setQua] = useState<number>(1080)
    const [src, setSrc] = useState<string>(`http://localhost:5000/api/merge/${link}/playlist.m3u8?quality=${qua}`)

    useEffect(() => {
        const loadVideo = async () => {
            const video = document.getElementById("plyr") as HTMLVideoElement;
            var hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            // @ts-ignore
            videoRef.current!.plyr.media = video;

            const defaultOptions: defaultOption = { controls: [] }

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const availableQuality = hls.levels.map((l) => l.height);
                defaultOptions.controls = [
                    'play-large',
                    'restart',
                    'rewind',
                    'play',
                    'fast-forward',
                    'progress',
                    'current-time',
                    'duration',
                    'mute',
                    'volume',
                    'captions',
                    'settings',
                    'pip',
                    'airplay',
                    'fullscreen'
                ];
                defaultOptions.qualitys = {
                    default: availableQuality[0],
                    options: availableQuality,
                    forced: true,
                    onChange: updateQuality
                };
                (videoRef.current!.plyr as PlyrInstance).play();
            });

            const updateQuality = (newQuality: number) => {
                // Sử dụng hàm hls.levels để tìm index của chất lượng mới dựa trên newQuality.
                const newIndex = hls.levels.findIndex((l) => l.height === newQuality);

                // Nếu tìm thấy index hợp lệ, hãy cập nhật chất lượng trong HLS.
                if (newIndex !== -1) {
                    hls.currentLevel = newIndex;
                }
            };
        };
        loadVideo();
    });

    return (
        <div>
            <Plyr
                ref={videoRef}
                // source={{
                //     type: "video",
                //     sources: [
                //         {
                //             src: src,
                //             type: "application/x-mpegURL",
                //         },
                //     ],
                // }}
                source={{} as PlyrProps["source"]}
                id="plyr"
            />
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