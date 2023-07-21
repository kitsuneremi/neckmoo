import styles from "@/styles/home/videoBox.module.scss";
import classNames from "classnames/bind";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import Link from 'next/link'
import Image from 'next/image'
import { FormatDateTime, ReduceString } from '@/function/function'

const cx = classNames.bind(styles);

type videoDataType = {
    id: number,
    title: string,
    des: string,
    view: number,
    status: number,
    link: string,
    fragmentMode: false,
    channelId: number,
    createdAt: Date,
    updatedAt: Date
}

type channelDataType = {
    id: number,
    name: string,
    tagName: string,
    des: string,
    accountId: number,
    createdAt: Date,
    updatedAt: Date
}

const HomeVideoItem = async ({ videoData, channelData }: { videoData: videoDataType, channelData: channelDataType }) => {

    const videoImageStorageRef = ref(storage, `/video/thumbnails/${videoData.link}`)
    const img = await getDownloadURL(videoImageStorageRef)
    const channelAvatarStorageRef = ref(storage, `/channel/avatars/${channelData.tagName}`)
    const channelAvatar = await getDownloadURL(channelAvatarStorageRef)


    return (

        <Link href={`/watch/${videoData.link}`}>
            <div className={cx("box")}>
                <img className={cx("thumbnail")} src={img} />
                <div>
                    <Link href={`/channel/${channelData.tagName}`}><Image alt="img" width={30} height={30} loading="lazy" src={channelAvatar} className={cx("icon")} /></Link>
                    <div>
                        <div>
                            <p className={cx("title")}>{ReduceString({ string: videoData.title, maxLength: 30 })}</p>
                        </div>
                        <div className={cx('channel-name-box')}>
                            <Link href={`/channel/${channelData.tagName}`}>
                                <p className={cx("channel-name")}>
                                    {channelData.name}
                                </p>
                            </Link>
                        </div>
                        <div>
                            <p className={cx("video-details")}>{videoData.view} lượt xem</p>
                            <p className={cx("video-details")}>{FormatDateTime(videoData.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    );
};


export default HomeVideoItem