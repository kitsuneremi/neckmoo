import {memo} from "react";
import style from '../../styles/WatchComment.module.scss'
import classNames from 'classnames/bind'
function WatchVideoCommentInput(){
    const cx = classNames.bind(style)
    return (
        <div className={cx('box')}>
            <img src="" className={cx('avatar')} />
            <div className={cx('input-textfield-box')}>
                <input type="text" placeholder="bình luận của bạn" className={cx('input-textfield')}/>
            </div>
        </div>
    )
}

export default memo(WatchVideoCommentInput)