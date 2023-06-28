'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "@/styles/channel/videoTab.module.scss";
import clsx from "clsx";
import Video from "./Video";

const cx = classNames.bind(styles);

const Videos = ({ tagName }) => {
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
            axios.get("/api/channel/popular", {
                params: {
                    tagName: tagName
                }
            })
                .then((res) => setListVideo(res.data));
        } else if (selectedTab === 1) {
            axios.get("/api/channel/newest", {
                params: {
                    tagName: tagName
                }
            })
                .then((res) => setListVideo(res.data));
        }
    }, [selectedTab]);

    const render = () => {
        if (listVideo.length !== 0) return listVideo.map((video, index) => {
            return (
                <Video key={index} video={video} />
            );
        });
    }


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
                {render()}
            </div>
        </div>
    );
};

export default Videos;