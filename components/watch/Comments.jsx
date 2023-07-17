'use client'
import { useState, useEffect } from "react";
import { RightOutlined, FilterOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import style from "@/styles/watch/watch.module.scss";
import axios from "axios";
import VideoComment from './VideoComment'
import { useSession } from 'next-auth/react'


const cx = classNames.bind(style);
export default function CommentComponents({ link }) {
    const [videoInfo, setData] = useState({});
    const [value, setValue] = useState("");
    const [change, setChange] = useState(true);
    const [listComment, setListComment] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        axios.get('/api/video/findbylink', {
            params: {
                link: link
            }
        }).then(res => { setData(res.data); return res }).then(val => {
            axios.get('/api/comment/getvideocomment', {
                params: {
                    videoId: val.data.id
                }
            }).then(res => { setListComment(res.data); setChange(false); });
        })
    }, [])

    useEffect(() => {
        if (change) {
            if (videoInfo && videoInfo.id) {
                axios.get('/api/comment/getvideocomment', {
                    params: {
                        videoId: videoInfo.id
                    }
                }).then(res => { setListComment(res.data); setChange(false); });
            }
        }
    }, [change, videoInfo]);


    const render = () => {
        if (listComment != null && listComment.length > 0) {
            return listComment.map((cmt, index) => (
                <VideoComment props={cmt} key={index} />
            ));
        } else {
            return <p>video này không có bình luận nào</p>;
        }
    };
    const handleCreateComment = () => {
        if (session) {
            axios.post("/api/comment/create", {
                accountId: session.user.id,
                videoId: videoInfo.id,
                referenceId: null,
                content: value,
                status: 0
            })
                .then(res => { setChange(true) })
                .then(() => { setValue("") });
        }
    };

    return (
        <div className={cx("comment-zone")}>
            <div className={cx("top-housing")}>
                <p>{videoInfo ? videoInfo.comment : 0} bình luận</p>
                <div>
                    <FilterOutlined />
                    sắp xếp theo
                </div>
            </div>
            <div className={cx('middle-housing')}>
                <img src={null} alt={null} />
                <div className={cx('response-box')}>
                    <input value={value} onChange={e => setValue(e.target.value)} className={cx('response-input')} />
                    <div>
                        <RightOutlined onClick={() => { handleCreateComment() }} />
                    </div>
                </div>
            </div>
            <div className={cx("bottom-housing")}>
                {render()}
            </div>
        </div>
    );
}