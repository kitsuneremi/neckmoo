'use client'
import styles from '@/styles/result/result.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase'
import axios from 'axios'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useWindowSize } from 'usehooks-ts'
import { ReduceString, FormatDateTime } from '@/function/function'


const cx = classNames.bind(styles)
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

    useIsomorphicLayoutEffect(() => {
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
            {src && <Image src={src} className={cx('thumbnail')} alt='thumbnail' width={360} height={202} priority={true} />}
            <div>
                <p className={cx('title')}>{ReduceString({ string: videoData.title, maxLength: 70 })}</p>
                <div>
                    <p className={cx('infomation')}>{videoData.view} lượt xem</p>
                    <p className={cx('infomation')}>{FormatDateTime(videoData.createdAt)}</p>
                </div>
                <div>
                    {channelAvatar && <Image src={channelAvatar} width={20} height={20} loading='lazy' alt='avatar' />}
                    {channelData == null ? <p>loading...</p> : <p className={cx('channel-name')}>{channelData.name}</p>}
                </div>
                <p className={cx('des')}>{ReduceString({ string: videoData.des, maxLength: 80 })}</p>
            </div>
        </div>
    )
}

