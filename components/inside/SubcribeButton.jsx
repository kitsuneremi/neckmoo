'use client'
import Context from "@/GlobalVariableProvider/Context";
import { useState, useEffect, useContext, useLayoutEffect, useRef } from "react";
import clsx from 'clsx'
import classNames from "classnames/bind";
import style from "@/styles/channel.module.scss";
import axios from "axios";

const cx = classNames.bind(style)

function SubcribeButton({ channelData }) {
    const [subcribe, setSubcribe] = useState(false)
    const context = useContext(Context)
    useEffect(() => {
        if (context.ses) {
            if (context.ses.user) {
                if (channelData.id) {
                    axios.get('/api/subcribe/issubcribed', {
                        params: {
                            accountId: context.ses.user.id,
                            targetChannel: channelData.id
                        }
                    }).then(res => {
                        if (res.data != null) {
                            setSubcribe(true);
                        } else {
                            setSubcribe(false);
                        }
                    })
                }
            }
        }
    }, [channelData])

    return (
        <button
            className={clsx(
                { [cx("subcribe-button")]: !subcribe },
                { [cx("unsubcribe-button")]: subcribe }
            )}
            onClick={() => {
                setSubcribe(!subcribe);
            }}
        >
            {subcribe ? "đã đăng ký" : "đăng ký"}
        </button>
    )
}


export default SubcribeButton