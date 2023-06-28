import styles from "@/styles/home/videoBox.module.scss";
import classNames from "classnames/bind";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import Link from 'next/link'
import Image from 'next/image'

const cx = classNames.bind(styles);


const HomeVideoItem = async (val) => {

    const name = val.title
    const view = val.view

    const videoImageStorageRef = ref(storage, `/video/thumbnails/${val.link}`)
    const img = await getDownloadURL(videoImageStorageRef)
    const channelAvatarStorageRef = ref(storage, `/channel/avatars/${val.tagName}`)
    const channelAvatar = await getDownloadURL(channelAvatarStorageRef)


    return (
        <div className={cx("box")}>
            <Link href={`/watch/${val.link}`}><img className={cx("thumbnail")} src={img} />
                <div>
                    <Link href={`/channel/${val.tagName}`}><Image alt="img" width={30} height={30} loading="lazy" src={channelAvatar} className={cx("icon")} /></Link>
                    <div>
                        <div>
                            <p className={cx("title")}>{name}</p>
                        </div>
                        <div className={cx('channel-name-box')}>
                            <Link href={`/channel/${val.tagName}`}>
                                <p className={cx("channel-name")}>
                                    {val.channelName}
                                </p>
                            </Link>
                        </div>
                        <div>
                            <p className={cx("video-details")}>{view} lượt xem</p>
                            <p className={cx("video-details")}>{val.status == 0 ? 'công khai' : 'không công khai'}</p>

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};


export default HomeVideoItem