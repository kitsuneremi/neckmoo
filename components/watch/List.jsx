'use client'

import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { useRouter } from "next/navigation";
import { CloseOutlined } from "@ant-design/icons";
import style from "@/styles/watch/watch.module.scss";
import clsx from "clsx";
import axios from "axios";
import classNames from "classnames/bind";

const cx = classNames.bind(style);


const Item = (props) => {
    const [img, setImg] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const videoThumbnailRef = ref(storage, `/video/thumbnails/${props.link}`)
        getDownloadURL(videoThumbnailRef).then(url => setImg(url))
    }, []);

    return (
        <div
            className={cx("items")}
            onClick={() => {
                router.push(`/watch/${props.link}`);
            }}
        >
            <img className={cx("thumbnail")} src={img} />
            <div>
                <div className={cx("video-title")}>{props.title}</div>
                <div className={cx("video-owner")}>{props.channelName}</div>
            </div>
        </div>
    );
};



export default function List() {
    const [openListBox, setOpenListBox] = useState(true);
    const [listVideo, setListVideo] = useState(null);

    useEffect(() => {
        axios.get("/api/video/all").then((res) => {
            setListVideo(res.data);
        });
    }, []);

    return (
        <div className={cx("box")}>
            <div
                className={cx("top-housing")}
                onClick={() => setOpenListBox(!openListBox)}
            >
                <div className={cx("top-left")}>
                    <h4>danh sách phát kết hợp</h4>
                </div>
                <div className={cx("top-right")}>
                    <button>
                        <CloseOutlined onClick={() => setOpenListBox(false)} />
                    </button>
                </div>
            </div>
            {listVideo != null ? (
                <div
                    className={clsx(
                        { [cx("bot-housing")]: openListBox },
                        { [cx("none")]: !openListBox }
                    )}
                >
                    {listVideo.map((video, index) => {
                        return (
                            <Item
                                key={index}
                                name={video.title}
                                title={video.title}
                                videoId={video.videoId}
                                channelName={video.name}
                                link={video.link}
                            />
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}


