'use client'
import classNames from "classnames/bind"
import styles from '@/styles/studio/studioSidebar.module.scss'
import { useAppSelector } from '@/redux/storage'
import { LoadingOutlined } from '@ant-design/icons'
import Link from "next/link"
const cx = classNames.bind(styles)

type propsObject = {
    icon: React.ReactNode,
    title: string,
    href: string
}

const props: propsObject[] = [
    {
        icon: <LoadingOutlined />,
        title: 'Tổng quan',
        href: '/studio/overview'
    },
    {
        icon: <LoadingOutlined />,
        title: 'Nội dung',
        href: '/studio/content'
    },
    {
        icon: <LoadingOutlined />,
        title: 'Đăng tải',
        href: '/studio/upload'
    },
    {
        icon: <LoadingOutlined />,
        title: 'Cập nhật sau',
        href: '/studio/overview'
    }
]

const actionProps: propsObject[] = [
    {
        icon: <LoadingOutlined />,
        title: 'Cài đặt',
        href: '/setting'
    },
    {
        icon: <LoadingOutlined />,
        title: 'Gửi phản hồi',
        href: '/feedback'
    }
]

const Item = ({ item, open }: { item: propsObject, open: boolean }) => {
    return (
        <Link href={item.href}>
            <div className={cx('item-box')}>
                <div className={cx('icon-box')}>
                    {item.icon ? item.icon : <></>}
                </div>
                {open ? <div className={cx('title-box')}>{item.title}</div> : <></>}
            </div>
        </Link>
    )
}



export default function StudioSidebar() {
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
    return (
        <div className={cx('box')}>
            <div className={cx('top')}>
                {props.map((item, index) => {
                    return <Item item={item} key={index} open={sidebar}></Item>
                })}
            </div>
            <div className={cx('bottom')}>
                {actionProps.map((item, index) => {
                    return <Item item={item} key={index} open={sidebar}></Item>
                })}
            </div>
        </div>
    )
}