'use client'
import { memo, useState } from "react";
import style from '@/styles/WatchComment.module.scss'
import classNames from 'classnames/bind'
import { RightOutlined } from '@ant-design/icons'
function WatchVideoComment(props) {
    const cx = classNames.bind(style)
    const [showResponseInput, setShowResponseInput] = useState(false)
    const [responseValue, setResponseValue] = useState("")

    const handleShowResponse = () => {
        if (showResponseInput) {
            return (
                <div className={cx('response-box')}>
                    <input value={responseValue} onChange={e => setResponseValue(e.target.value)} className={cx('response-input')} />
                    <div>
                        <RightOutlined />
                    </div>
                </div>
            )
        }
    }
    return (
        <div className={cx('comment-row')}>
            <img src="" />
            <div>
                <div>
                    <p className={cx('comment-channel-name')}>erinasaiyukii</p>
                </div>
                <div>
                    <p className={cx('comment-text')}>this is the text write by hand</p>
                </div>
                <div className={cx('tool-box')}>
                    <button>like</button>
                    <button>dislike</button>
                    <button onClick={() => { setShowResponseInput(!showResponseInput) }}>phản hồi</button>
                </div>
                {handleShowResponse()}
            </div>
        </div>
    )
}
export default memo(WatchVideoComment)