'use client'
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/styles/result/result.module.scss'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase'
import SubcribeButton from '../watch/SubcribeButton';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import Video from './Video';


const cx = classNames.bind(styles)
const baseUrl = process.env.VERCEL ? 'https://www.erinasaiyukii.com' : 'http://localhost:3000';

type channelData = {
    id: number,
    name: string,
    tagName: string,
    des: string,
    accountId: number,
    createdAt: Date,
    updatedAt: Date,
    videoCount: number
    subcribeCount: number,

}

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

export default function Channel({ tagName }) {
    const [channelData, setChannelData] = useState<channelData>();
    const [src, setSrc] = useState<string | null>(null)
    const [listNewestVideo, setListNewestVideo] = useState<videoData[]>([])
    const router = useRouter()

    useIsomorphicLayoutEffect(() => {
        async function fetchData() {
            // const response = await fetch(`${baseUrl}/api/channel?tagName=${tagName}`);
            axios.get(`/api/channel`, {
                params: {
                    tagName: tagName
                }
            }).then(res => {
                setChannelData(res.data);
                getDownloadURL(ref(storage, `/channel/avatars/${res.data.tagName}`)).then(url => setSrc(url))
            })

            axios.get('/api/channel/newest', {
                params: {
                    tagName: tagName
                }
            }).then(res =>
                setListNewestVideo(res.data)
            )

        }
        fetchData();
    }, []);

    if (!channelData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={cx('channel-box')} onClick={() => { router.push(`/channel/${tagName}`) }}>
                <div className={cx('img-box')}>
                    {src && <Image src={src} width={140} height={140} alt='thumbnail' priority={true} />}
                </div>
                <div className={cx('des-box')}>
                    <h2>{channelData ? channelData.name : ''}</h2>
                    <p>{channelData ? `@${channelData.tagName}` : ''}</p>
                    <p>{channelData ? channelData.des : ''}</p>
                </div>
                <div className={cx('sub-box')}>
                    <SubcribeButton link={null} channelData={channelData} />
                </div>
            </div>
            {videoNewestRender({ listNewestVideo, channelData })}
        </>
    );
}

const videoNewestRender: React.FC<{ listNewestVideo: videoData[], channelData: channelData }> = ({ listNewestVideo, channelData }: { listNewestVideo: videoData[], channelData: channelData }) => {
    return (
        <div className={cx('video-relation-box')}>
            <p>{`video mới nhất của ${channelData.name}`}</p>
            {
                listNewestVideo.length > 0 ? listNewestVideo.map((video, index) => {
                    return (
                        <Video videoData={video} key={index}></Video>
                    )
                }) : <></>
            }
        </div>
    )
}
