'use client'
import { useContext, useState, useEffect } from "react";
import Context from '@/GlobalVariableProvider/Context'
import classNames from "classnames/bind";
import watchstyle from "@/styles/watch/watch.module.scss";
import channelstyle from "@/styles/channel/channel.module.scss";
import axios from "axios";



export default function SubcribeButton({ link, channelData }) {
    let cx;
    channelData == null ? cx = classNames.bind(watchstyle) : cx = classNames.bind(channelstyle)
    const context = useContext(Context)
    const [subcribe, setSubcribe] = useState(false);
    useEffect(() => {
        if (context.ses) {
            if (context.ses.user) {
                if (channelData != null) {
                    axios.get('/api/subcribe/issubcribed', {
                        params: {
                            accountId: context.ses.user.id,
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
                                accountId: context.ses.user.id,
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
        if (context.ses) {
            if (context.ses.user) {
                if (subcribe) {
                    setSubcribe(false);
                    if (channelData != null) {
                        axios.post('/api/subcribe/delete', {
                            accountId: context.ses.user.id,
                            targetChannel: channelData.id
                        }, {
                            headers: {
                                'accessToken': context.ses.accessToken
                            }
                        })
                    } else {
                        axios.get('/api/channel/find', {
                            params: {
                                link: link
                            }
                        }).then(res => {
                            axios.post('/api/subcribe/delete', {
                                accountId: context.ses.user.id,
                                targetChannel: res.data.id
                            }, {
                                headers: {
                                    'accessToken': context.ses.accessToken
                                }
                            })
                        })
                    }
                } else {
                    setSubcribe(true);
                    if (channelData != null) {
                        axios.post('/api/subcribe/add', {
                            accountId: context.ses.user.id,
                            targetChannel: channelData.id
                        }, {
                            headers: {
                                'accessToken': context.ses.accessToken
                            }
                        })
                    } else {
                        axios.get('/api/channel/find', {
                            params: {
                                link: link
                            }
                        }).then(res => {
                            axios.post('/api/subcribe/add', {
                                accountId: context.ses.user.id,
                                targetChannel: res.data.id
                            }, {
                                headers: {
                                    'accessToken': context.ses.accessToken
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