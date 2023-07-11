import { MoreOutlined } from "@ant-design/icons"
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import classNames from "classnames/bind"
import styles from '@/styles/channel/feature.module.scss'
import Image from "next/image"
import Link from "next/link"

const cx = classNames.bind(styles)

async function Thumbnail({ link }) {

    const src = await getDownloadURL(ref(storage, `/video/thumbnails/${link}`))

    return (
        <Image src={src} width={256} height={144} alt="thumbnail" loading="lazy"/>
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
    return (
        <Link href={`/watch/${video.link}`}>
            <div className={cx('video-box')}>
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
        </Link>
    )
}