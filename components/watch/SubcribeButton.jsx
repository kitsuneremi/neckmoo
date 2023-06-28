'use client'
import { useContext, useState, useEffect } from "react";
import Context from '@/GlobalVariableProvider/Context'
import classNames from "classnames/bind";
import style from "@/styles/watch/watch.module.scss";
import axios from "axios";

const cx = classNames.bind(style);

export default function SubcribeButton({ link }) {
    const context = useContext(Context)
    const [subcribe, setSubcribe] = useState(false);
    useEffect(() => {
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