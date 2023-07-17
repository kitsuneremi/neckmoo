'use client'
import classNames from "classnames/bind"
import styles from '@/styles/studio/studioSidebar.module.scss'
import {useAppSelector} from '@/redux/storage'
const cx = classNames.bind(styles)

const props = [
    {
        icon: '',
        title: 'tổng quan',
    },
    {
        icon: '',
        title: 'nội dung',
    },
    {
        icon: '',
        title: 'đăng tải',
    },
    {
        icon: '',
        title: 'cập nhật sau'
    }
]

const actionProps = [
    {
        icon: '',
        title: 'cài đặt'
    },
    {
        icon: '',
        title: 'gửi phản hồi'
    }
]

const Item = ({ item, ec }) => {
    return (
        <div className={cx('item-box')}>
            <div className={cx('icon-box')}></div>
            {ec ? <div className={cx('title-box')}>{item.title}</div> : <></>}
        </div>
    )
}



export default function StudioSidebar() {
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
    return (
        <div className={cx('over-box')}>
            <div className={cx('top-housing')}>
                <div className={cx('infomation-box')}>
                    <img src={null} className="avartar" />
                    <p></p>
                </div>
                <div className={cx('navigation-box')}>
                    {props.map((item, index) => {
                        return <Item item={item} key={index} ec={sidebar}></Item>
                    })}
                </div>
            </div>
            <div className={cx('action-box')}>
                {actionProps.map((item, index) => {
                    return <Item item={item} key={index} ec={sidebar}></Item>
                })}
            </div>
        </div>
    )
}