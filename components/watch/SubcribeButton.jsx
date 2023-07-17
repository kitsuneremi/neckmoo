'use client'
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import watchstyle from "@/styles/watch/watch.module.scss";
import channelstyle from "@/styles/channel/channel.module.scss";
import axios from "axios";
import { useSession } from 'next-auth/react'



export default function SubcribeButton({ link, channelData }) {
    let cx;
    channelData == null ? cx = classNames.bind(watchstyle) : cx = classNames.bind(channelstyle)
    const [subcribe, setSubcribe] = useState(false);
    const session = useSession()
    useEffect(() => {
        if (session) {
            if (session.user) {
                if (channelData != null) {
                    axios.get('/api/subcribe/issubcribed', {
                        params: {
                            accountId: session.user.id,
                            targetChannel: channelData.id
                        }
                    }).then(val => {
                        setSubcribe(val.data != null);
                    })
                } else {
                    axios.get('/api/channel/find', {
                        params: {
                            link: link
                        }
                    }).then(res => {
                        axios.get('/api/subcribe/issubcribed', {
                            params: {
                                accountId: session.user.id,
                                targetChannel: res.data.id
                            }
                        }).then(val => {
                            setSubcribe(val.data != null);
                        })
                    })
                }
            }
        }
    }, [{ link, channelData }])


    const handleSubcribe = () => {
        if (session) {
            if (session.user) {
                if (subcribe) {
                    setSubcribe(false);
                    if (channelData != null) {
                        axios.post('/api/subcribe/delete', {
                            accountId: session.user.id,
                            targetChannel: channelData.id
                        }, {
                            headers: {
                                'accessToken': session.accessToken
                            }
                        })
                    } else {
                        axios.get('/api/channel/find', {
                            params: {
                                link: link
                            }
                        }).then(res => {
                            axios.post('/api/subcribe/delete', {
                                accountId: session.user.id,
                                targetChannel: res.data.id
                            }, {
                                headers: {
                                    'accessToken': session.accessToken
                                }
                            })
                        })
                    }
                } else {
                    setSubcribe(true);
                    if (channelData != null) {
                        axios.post('/api/subcribe/add', {
                            accountId: session.user.id,
                            targetChannel: channelData.id
                        }, {
                            headers: {
                                'accessToken': session.accessToken
                            }
                        })
                    } else {
                        axios.get('/api/channel/find', {
                            params: {
                                link: link
                            }
                        }).then(res => {
                            axios.post('/api/subcribe/add', {
                                accountId: session.user.id,
                                targetChannel: res.data.id
                            }, {
                                headers: {
                                    'accessToken': session.accessToken
                                }
                            })
                        })
                    }
                }
            }
        }

    }

    return (
        <>
            {!subcribe ? (
                <button className={cx("subcribe-button")} onClick={() => { handleSubcribe() }}>
                    đăng ký
                </button>
            ) : (
                <button
                    className={cx("unsubcribe-button")}
                    onClick={() => { handleSubcribe(); }}
                >
                    đã đăng ký
                </button>
            )}
        </>
    )
}