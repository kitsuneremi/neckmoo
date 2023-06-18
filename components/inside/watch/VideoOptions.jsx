'use client'
import { LikeFilled, DislikeFilled, ShareAltOutlined, DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import style from "@/styles/watch.module.scss";
import clsx from "clsx";
import { useLayoutEffect, useContext, useState } from "react";
import Context from '@/GlobalVariableProvider/Context'
import axios from "axios";


const cx = classNames.bind(style);
export default function VideoOption({ link }) {
    const context = useContext(Context)
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useLayoutEffect(() => {
        if (context.ses) {
            if (link) {
                const x = async () => {
                    const videoInfo = await axios.get('/api/video/findbylink', {
                        params: {
                            link: link
                        }
                    }).then(res => {
                        axios.get('/api/like/find', {
                            params: {
                                accountId: context.ses.user.id,
                                targetId: res.data.id
                            }
                        }).then(val => {
                            if (val.data.type == null) {
                                setLike(false)
                                setDislike(false)
                            } else {
                                if (val.data.type == 0) {
                                    setLike(true)
                                    setDislike(false)
                                } else {
                                    setLike(false)
                                    setDislike(true)
                                }
                                setLikeCount(val.data.count)
                            }
                        })

                    })

                }
                x();
            }
        }
    }, [context.ses])

    const handleLike = () => {
        if (context.ses) {
            if (like) {
                setLike(false);
                setDislike(false);
                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                }).then(res => { setLikeCount(res.data.count) })
            } else {
                setLike(true);
                setDislike(false);
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 0
                }).then(res => { setLikeCount(res.data.count) })
            }
        }
    };
    const handleDislike = () => {

        if (context.ses) {
            setDislike(!dislike);
            setLike(false);
            if (dislike) {
                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                }).then(res => { setLikeCount(res.data.count) })
            } else {
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 1
                }).then(res => { setLikeCount(res.data.count) })
            }
        }
    };

    if (typeof window !== "undefined") {
        if (window.innerWidth < 500) {
            return <></>
        } else {
            return (
                <>
                    <button className={cx('share-button')}>
                        <ShareAltOutlined />
                        <p>Share</p>
                    </button>
                    <div>
                        <div className={cx("like-box")} onClick={() => { handleLike() }}>
                            {like ? <LikeFilled /> : <LikeOutlined />}
                            <p className={cx("like-count")}>{likeCount}</p>
                        </div>
                        <div className={cx("dislike-box")} onClick={() => { handleDislike() }}>
                            {dislike ? <DislikeFilled /> : <DislikeOutlined />}
                        </div>
                    </div>
                </>
            )
        }
    }
}