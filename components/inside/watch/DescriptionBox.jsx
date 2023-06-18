'use client'
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "@/styles/watch.module.scss";
import clsx from "clsx";
import axios from "axios";

const cx = classNames.bind(style);
export default function DescriptionBox({ link }) {
    const [collapseDescription, setCollapseDescription] = useState(false);
    const [videoInfo, setVideoInfo] = useState({});
    useEffect(() => {
        axios.get('/api/video/findbylink', {
            params: {
                link: link
            }
        }).then(res => setVideoInfo(res.data))
    }, [])
    return (
        <div className={clsx({ [cx("description-box-collapse")]: collapseDescription }, { [cx("description-box-expand")]: !collapseDescription })}>
            <p>{typeof videoInfo.view !== 'undefined' ? `${videoInfo.view} lượt xem` : ''}</p>
            <p
                className={cx("handle-collapse-expand-button")}
                onClick={() => {
                    setCollapseDescription(!collapseDescription);
                }}
            >
                {collapseDescription ? "Hiện thêm" : "Ẩn bớt"}
            </p>
        </div>
    )
}