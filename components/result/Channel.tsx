'use client'
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/styles/result/result.module.scss'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase'
import SubcribeButton from '../watch/SubcribeButton';
import { useRouter } from 'next/navigation'


const cx = classNames.bind(styles)
const baseUrl = process.env.VERCEL ? 'https://erinasaiyukii.com' : 'http://localhost:3000';

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

export default function Channel({ tagName }) {
    const [channelData, setChannelData] = useState<channelData>();
    const [src, setSrc] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/api/channel?tagName=${tagName}`);
            const data = await response.json();
            setChannelData(data);
            getDownloadURL(ref(storage, `/channel/avatars/${data.tagName}`)).then(url => setSrc(url))
        }
        fetchData();
    }, []);

    if (!channelData) {
        return <div>Loading...</div>;
    }

    return (
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
        </div >
    );
}
