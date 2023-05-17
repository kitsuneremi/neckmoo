'use client'
import { useRouter } from "next/navigation"
import { MoreOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from '@/styles/feature.module.scss'
import Link from 'next/link'
import axios from "axios"


const cx = classNames.bind(styles)
const Thumbnail = ({ link }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        const fetchThumbnail = async () => {
            const res = await axios.get(`http://localhost:5000/api/fileout/image/${link}`, { responseType: 'blob' });
            var binaryData = [];
            binaryData.push(res.data);
            setSrc(URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
        };
        fetchThumbnail();
    }, [link]);

    return (
        <div>
            {src && <img className={cx('video-thumbnail')} src={src} alt="thumbnail" />}
        </div>
    );
};


const Feature = (props) => {
    const router = useRouter()
    const [listVideo, setListVideo] = useState([])
    useEffect(() => {
        if (!props.slug) return
        axios.get(`http://localhost:5000/api/detailchannel/featured/video?channelId=${props.slug}}&offset=${0}&limit=${6}`)
            .then(res => { setListVideo(res.data) })
    }, [props.slug])

    return (
        <div>
            <div>
                <div className={cx('play-all-box')}>
                    <p className={cx('list-title')}>Video</p>
                    <button className={cx('play-button')}>phát tất cả</button>
                </div>
                <div style={{ display: 'flex' }}>
                    {listVideo.map((video, index) => {
                        return (
                            <Link key={index} href={`/watch/${video.link}`}>
                                <div className={cx('video-box')}>
                                    <div>
                                        <Thumbnail link={video.link} />
                                    </div>
                                    <div className={cx('title-box')}>
                                        <p className={cx('video-title')}>{video.title}</p>
                                        <MoreOutlined style={{ cursor: 'pointer' }} />
                                    </div>
                                    <div className={cx('info-box')}>
                                        <p className={cx('views')}>{video.view}</p>
                                        <p className={cx('time-stamp')}>time stamp</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Feature