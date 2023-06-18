'use client'
import { useContext, useState, useLayoutEffect } from "react";
import Context from '@/GlobalVariableProvider/Context'
import classNames from "classnames/bind";
import style from "@/styles/watch.module.scss";
import clsx from "clsx";
import axios from "axios";

const cx = classNames.bind(style);

export default function SubcribeButton({ link }) {
    const context = useContext(Context)
    const [subcribe, setSubcribe] = useState(false);
    useLayoutEffect(() => {
        if (context.ses) {
            if (context.ses.user) {
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
                        if (val.data != null) {
                            setSubcribe(true);
                        } else {
                            setSubcribe(false);
                        }
                    })
                })
            }
        }
    }, [link])


    const handleSubcribe = () => {
        if (context.ses) {
            if (context.ses.user) {
                if (subcribe) {
                    setSubcribe(false);
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

                } else {
                    setSubcribe(true);
                    axios.post('/api/subcribe/delete', {
                        accountId: context.ses.user.id,
                        targetChannel: channelData.id
                    }, {
                        headers: {
                            'accessToken': context.ses.accessToken
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