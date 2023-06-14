'use client'
import { useRouter } from "next/navigation"
import { MoreOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import classNames from "classnames/bind"
import styles from '@/styles/feature.module.scss'
import axios from "axios"


const cx = classNames.bind(styles)
const Thumbnail = ({ link }) => {
    const [src, setSrc] = useState();

    useEffect(() => {
        const videoImageStorageRef = ref(storage, `/video/thumbnails/${link}`)
        getDownloadURL(videoImageStorageRef).then(url => setSrc(url))
    }, [link]);

    return (
        <>
            <img className={cx('video-thumbnail')} src={src} alt="thumbnail" />
        </>
    );
};


const Feature = (props) => {
    const router = useRouter()
    const [listVideo, setListVideo] = useState([])
    useEffect(() => {
        if (!props.slug) return
        axios.get('/api/video/bychannel', {
            params: {
                tagName: props.slug
            }
        }).then(res => setListVideo(res.data))
    }, [props.slug])

    return (
        <div className={cx('box')}>
            <div className={cx('play-all-box')}>
                <p className={cx('list-title')}>Video</p>
                <button className={cx('play-button')}>phát tất cả</button>
            </div>
            <div className={cx('video-slider')}>
                {listVideo.map((video, index) => {
                    return (
                        <div key={index} className={cx('video-box')} onClick={() => { router.push(`/watch/${video.link}`) }}>
                            <Thumbnail link={video.link} />
                            <div className={cx('title-box')}>
                                <p className={cx('video-title')}>{video.title}</p>
                                <MoreOutlined style={{ cursor: 'pointer' }} />
                            </div>
                            <div className={cx('info-box')}>
                                <p className={cx('views')}>{video.view}</p>
                                <p className={cx('time-stamp')}>time stamp</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Feature