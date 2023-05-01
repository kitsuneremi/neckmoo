import { useState, useEffect } from 'react'
import { Link } from 'next/link'
import style from '../../styles/VideoListSidebarBox.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'

export default function ListSidebarItem(props) {
    const cx = classNames.bind(style)
    const [img, setImg] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/file/image/${props.link}`, { responseType: 'blob' })
            .then(res => {
                var binaryData = [];
                binaryData.push(res.data);
                setImg(window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
            })
    }, [])

    return (
        <Link href={`/watch/${props.link}`}>
            <div className={cx("items")}>
                <img className={cx("thumbnail")} src={img} />
                <div>
                    <div className={cx("video-title")}>{props.title}</div>
                    <div className={cx("video-owner")}>{props.channelName}</div>
                </div>
            </div>
        </Link>
    )
}

