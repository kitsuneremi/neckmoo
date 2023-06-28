'use client'
import { useLayoutEffect, useState, useEffect } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import SubcribeButton from "./SubcribeButton";
import Link from 'next/link'
import classNames from "classnames/bind";
import style from "@/styles/watch/watch.module.scss";
import VideoOptions from './VideoOptions'
import axios from "axios";

const cx = classNames.bind(style);
export default function Properties({ link }) {
    const [img, setImg] = useState(null)
    const [channel, setChannel] = useState({})
    const [video, setVideo] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const x = await axios.get('/api/video/videoinfoandchanneldata', {
                params: {
                    link: link
                }
            }).then(res => { const { channelx, videox } = res.data; setChannel(channelx); setVideo(videox); return channelx })
                .then(val => {
                    getDownloadURL(ref(storage, `/channel/avatars/${val.tagName}`))
                        .then(url => setImg(url))
                })

        }
        fetchData()


    }, [])
    return (
        <div className={cx("infomation-box")}>
            <p className={cx("title")}>{video.title}</p>
            <div>
                <div className={cx("left-housing")}>
                    <Link href={`/channel/${channel.tagName}`}>
                        <img
                            className={cx("avatar")}
                            src={img}
                        ></img>
                    </Link>
                    <div>
                        <div>
                            <p className={cx("channel-name")}>{channel.name}</p>
                        </div>
                        <div>
                            <p className={cx("channel-info")}>{channel.sub} lượt đăng ký</p>
                        </div>
                    </div>
                    <SubcribeButton link={link} />
                </div>

                <div className={cx("right-housing")}>
                    <VideoOptions link={link} />
                    <button>
                        <EllipsisOutlined />
                    </button>
                </div>
            </div>
        </div>
    )
}

