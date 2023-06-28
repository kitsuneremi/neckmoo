'use client'
import { useRouter } from "next/navigation"
import { MoreOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import classNames from "classnames/bind"
import styles from '@/styles/channel/feature.module.scss'
import axios from "axios"
import Video from "./Video"

const cx = classNames.bind(styles)

const Feature = ({ tagName }) => {

    const [listVideo, setListVideo] = useState([])
    useEffect(() => {
        if (!tagName) return
        axios.get('/api/video/bychannel', {
            params: {
                tagName: tagName
            }
        }).then(res => setListVideo(res.data))
    }, [tagName])

    return (
        <div className={cx('box')}>
            <div className={cx('play-all-box')}>
                <p className={cx('list-title')}>Video</p>
                <button className={cx('play-button')}>phát tất cả</button>
            </div>
            <div className={cx('video-slider')}>
                {listVideo.map((video, index) => {
                    return (
                        <Video video={video} key={index} />
                    )
                })}
            </div>
        </div>

    )
}

export default Feature