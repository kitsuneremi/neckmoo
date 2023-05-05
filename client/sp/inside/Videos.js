import axios from "axios";
import classNames from "classnames/bind";
import styles from "@/styles/ChannelTabVideos.module.scss";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { MoreOutlined } from "@ant-design/icons";

const Thumbnail = ({ link }) => {
    const cx = classNames.bind(styles);
    const [src, setSrc] = useState("");

    useEffect(() => {
        const fetchThumbnail = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/file/image/${link}`,
                { responseType: "blob" }
            );
            var binaryData = [];
            binaryData.push(res.data);
            setSrc(URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
        };
        fetchThumbnail();
    }, [link]);

    return (
        <div className={cx('thumbnail-box')}>
            {src && <img className={cx("video-thumbnail")} src={src} alt="thumbnail" />}
        </div>
    );
};

const Videos = () => {
    const cx = classNames.bind(styles);
    const [listVideo, setListVideo] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const listButton = [
        {
            title: 'Phổ biến'
        },
        {
            title: 'Mới nhất'
        }
    ]

    useEffect(() => {
        if (selectedTab === 0) {
            axios.get("http://localhost:5000/api/detailchannel/videos/popular")
                .then((res) => setListVideo(res.data));
        } else if (selectedTab === 1) {
            axios.get("http://localhost:5000/api/detailchannel/videos/newest")
                .then((res) => setListVideo(res.data));
        }
    }, [selectedTab]);

    return (
        <div className={cx("box")}>
            <div className={cx("top-housing")}>
                {listButton.map((button, index) => {
                    return (
                        <button
                            key={index}
                            className={clsx({ [cx("selected-tab-button")]: selectedTab === index }, { [cx("tab-button")]: selectedTab !== index })}
                            onClick={() => setSelectedTab(index)}>
                            {button.title}
                        </button>
                    )
                })}
            </div>
            <div className={cx("bottom-housing")}>
                {listVideo.map((video, index) => (
                    <div key={index} className={cx("video-box")}>
                        <Thumbnail link={video.link} />
                        <div className={cx('title-box')}>
                            <p className={cx('title')}>{video.title}</p>
                            <MoreOutlined />
                        </div>
                        <div className={cx('info-box')}>
                            <p className={cx('views')}>{video.view == 0 ? 'chưa có lượt xem' : `${video.view} lượt xem`}</p>
                            <p className={cx('time-stamp')}>time stamp</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;