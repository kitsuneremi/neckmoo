import style from '../../styles/Watch.module.scss';
import classNames from 'classnames/bind'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
export default function (props) {
    const cx = classNames.bind(style)
    const [collapse, setCollapse] = useState(true)
    const [height, setHeight] = useState(80)
    useEffect(() => {
        collapse ? setHeight(80) : setHeight('fit-content')
    },[collapse])
    return (
        <div className={cx('video-description')}>
            <p className={cx('des-text')} style={{'height': height}}>{props.value.trim() === '' ? props.value : "video này không có mô tả"}</p>
            <p className={cx('des-btn')} onClick={() => {setCollapse(!collapse)}}>{collapse ? "hiện thêm" : "ẩn bớt"}</p>
        </div>
    )
}