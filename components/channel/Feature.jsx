'use client'
import classNames from "classnames/bind"
import styles from '@/styles/channel/feature.module.scss'
import Video from "./Video"
import axios from "axios"
import { useEffect, useState } from "react"

const cx = classNames.bind(styles)


export default function Feature({ tagName }) {
    
    const [listVideo, setListVideo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            axios.get('/api/video/bychannel', {
                params: {
                    tagName: tagName
                }
            }).then(res => { setListVideo(res.data) })
        }

        fetchData()
    }, [])

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