'use client'
import { useRouter } from "next/navigation"
import { MoreOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import classNames from "classnames/bind"
import styles from '@/styles/channel/feature.module.scss'

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

function formatDateTime(dateTime) {
    const currentTime = new Date();
    const inputTime = new Date(dateTime);

    const timeDiff = Math.abs(currentTime - inputTime); // Độ chênh lệch thời gian

    // Đổi milliseconds thành phút
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    if (minutesDiff < 1) {
        return "Vừa xong";
    } else if (minutesDiff < 60) {
        return minutesDiff + " phút trước";
    } else if (minutesDiff < 1440) { // 1 ngày có 1440 phút
        const hoursDiff = Math.floor(minutesDiff / 60);
        return hoursDiff + " giờ trước";
    } else if (minutesDiff < 43200) { // 30 ngày có 43200 phút
        const daysDiff = Math.floor(minutesDiff / 1440);
        return daysDiff + " ngày trước";
    } else if (minutesDiff < 525600) { // 365 ngày có 525600 phút
        const monthsDiff = Math.floor(minutesDiff / 43200);
        return monthsDiff + " tháng trước";
    } else {
        const yearsDiff = Math.floor(minutesDiff / 525600);
        return yearsDiff + " năm trước";
    }
}

export default function Video({ video }) {
    const router = useRouter()

    return (
        <div className={cx('video-box')} onClick={() => { router.push(`/watch/${video.link}`) }}>
            <Thumbnail link={video.link} />
            <div className={cx('title-box')}>
                <p>{video.title}</p>
                <MoreOutlined style={{ cursor: 'pointer' }} />
            </div>
            <div className={cx('info-box')}>
                <p className={cx('views')}>{video.view} lượt xem</p>
                <p className={cx('time-stamp')}>{formatDateTime(video.createdAt)}</p>
            </div>
        </div>
    )
}