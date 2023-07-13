'use client'
import styles from '@/styles/result/result.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase'
import axios from 'axios'


const cx = classNames.bind(styles)
const baseUrl = process.env.VERCEL ? 'https://erinasaiyukii.com' : 'http://localhost:3000';

type videoData = {
    id: number,
    title: string,
    des: string,
    view: number,
    status: number,
    link: string,
    fragmentMode: boolean,
    channelId: number,
    createdAt: Date,
    updatedAt: Date
}

type channelData = {

    id: number,
    name: string,
    tagName: string,
    des: string,
    accountId: number,
    createdAt: Date,
    updatedAt: Date,
    videoCount: number
    sub: number,

}


export default function Video({ videoData }: { videoData: videoData }) {
    const [src, setSrc] = useState<string | null>(null)
    const [channelData, setChannelData] = useState<channelData | null>(null)
    const [channelAvatar, setChannelAvatar] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            axios.get('/api/channel/find', {
                params: {
                    link: videoData.link
                }
            }).then(res => { setChannelData(res.data); getDownloadURL(ref(storage, `/channel/avatars/${res.data.tagName}`)).then(url => setChannelAvatar(url)) })
            getDownloadURL(ref(storage, `/video/thumbnails/${videoData.link}`)).then(url => setSrc(url))

        }
        fetchData()
    }, [])

    return (
        <div className={cx('video-box')}>
            <div>
                {src && <Image src={src} alt='thumbnail' width={360} height={202} priority={true} />}
            </div>
            <div>
                <h2>{videoData.title}</h2>
                <div>
                    <p>{videoData.view} lượt xem</p>
                    <p>{formatDateTime(videoData.createdAt)}</p>
                </div>
                <div>
                    {channelAvatar && <Image src={channelAvatar} width={20} height={20} loading='lazy' alt='avatar' />}
                    {channelData == null ? <p>loading...</p> : <p>{channelData.name}</p>}
                </div>
                <p>
                    {videoData.des}
                </p>
            </div>
        </div>
    )
}



function formatDateTime(dateTime: Date) {
    const currentTime: any = new Date();
    const inputTime: any = new Date(dateTime);

    const timeDiff: any = Math.abs(currentTime - inputTime); // Độ chênh lệch thời gian

    // Đổi milliseconds thành phút
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    if (minutesDiff < 1) {
        return "Vừa xong";
    } else if (minutesDiff < 60) {
        return minutesDiff + " phút trước";
    } else if (minutesDiff < 1440) {
        const hoursDiff = Math.floor(minutesDiff / 60);
        return hoursDiff + " giờ trước";
    } else if (minutesDiff < 43200) {
        const daysDiff = Math.floor(minutesDiff / 1440);
        return daysDiff + " ngày trước";
    } else if (minutesDiff < 525600) {
        const monthsDiff = Math.floor(minutesDiff / 43200);
        return monthsDiff + " tháng trước";
    } else {
        const yearsDiff = Math.floor(minutesDiff / 525600);
        return yearsDiff + " năm trước";
    }
}