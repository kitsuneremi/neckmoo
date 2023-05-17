import { memo } from "react";
import style from '../../styles/WatchComment.module.scss'
import classNames from 'classnames/bind'
function WatchVideoComment() {
    const cx = classNames.bind(style)
    return (
        <div className={cx('comment-row')}>
            <div span={1}>
            </div>
            <div span={23}>
                <div>
                    {/* <p className={cx('comment-channel-name')}>erinasaiyukii</p> */}
                </div>
                <div style={{ height: 'fit-content', width: 'inherit' }}>
                    {/* <p className={cx('comment-text')}>this is the text write by hand</p> */}
                </div>
                <div>
                    <button>like</button>
                    <button style={{ marginLeft: '5px' }}>dislike</button>
                    {/* <p style={{ marginBottom: 0, marginLeft: '5px' }}>phản hồi</p> */}
                </div>
            </div>
        </div>
    )
}
export default memo(WatchVideoComment)