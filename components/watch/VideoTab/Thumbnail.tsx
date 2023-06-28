import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "@/styles/videoTab.module.scss";
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "@/lib/firebase";

const cx = classNames.bind(styles)
export default function Thumbnail({ link }: { link: string }) {

    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchThumbnailUrl = async () => {
            const thumbnailRef = ref(storage, `/video/thumbnails/${link}`);
            const thumbnailUrl = await getDownloadURL(thumbnailRef);
            setUrl(thumbnailUrl);
        };

        fetchThumbnailUrl();
    }, [link]);


    return (
        <div className={cx('thumbnail-box')}>
            {url && <img className={cx("video-thumbnail")} src={url} alt="thumbnail" />}
        </div>
    );
};