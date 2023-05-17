'use client'
import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Context from "@/GlobalVariableProvider/Context"
import clsx from "clsx"
import styles from '@/styles/sidebar.module.scss'
import classNames from "classnames/bind"
import { HomeOutlined, ClockCircleOutlined, CoffeeOutlined, HistoryOutlined, BookOutlined } from '@ant-design/icons'

const cx = classNames.bind(styles)
const Single = (prop) => {
    const router = useRouter()
    return (
        <div onClick={() => { router.push(prop.item.href) }} className={clsx({ [cx('parent-box')]: prop.tab !== prop.index }, { [cx('selected-parent-box')]: prop.tab === prop.index })}>
            {prop.item.icon}
            <div className={cx('title')}>{prop.item.name}</div>
        </div>
    )
}

const Multiple = (prop) => {
    const [show, setShow] = useState(prop.item.show)
    return (
        <>
            <div className={clsx({ [cx('parent-box')]: prop.tab !== prop.index }, { [cx('selected-parent-box')]: prop.tab === prop.index })} onClick={() => { setShow(!show) }}>
                {prop.item.icon}
                <div className={cx('title')}>{prop.item.name}</div>
            </div>
            {show && prop.item.child.map((x, index) => {
                return <Link href={`/channel/${x.tagName}`} key={index}><div className={cx('item-child')}>{x.name}</div></Link>
            })}
        </>
    )
}
export default function WatchSidebar() {
    const [selectedTab, setSelectedTab] = useState(-1)
    const context = useContext(Context)
    useEffect(() => {
        context.setCollapseSidebar(true)
    },[])

    const props = [
        { name: 'Trang chủ', icon: <HomeOutlined className={cx('icon')} />, href: '/' },
        { name: 'Shorts', icon: <ClockCircleOutlined className={cx('icon')} />, href: '/shorts' },
        {
            name: 'Kênh đăng ký',
            icon: <CoffeeOutlined className={cx('icon')} />,
            child: [{
                name: 'Laur',
                tagName: '@laur'
            }, {
                name: 'Lily',
                tagName: '@lily2811'
            }],
            ref: null,
            show: true
        },
        { name: 'Video đã xem', icon: <HistoryOutlined className={cx('icon')} />, href: '/history' },
        { name: 'Thư viện', icon: <BookOutlined className={cx('icon')} />, href: '/libary' }
    ]
    const render = () => {
        return props.map((prop, index) => {
            if (prop.child) {
                return <Multiple item={prop} key={index} index={index} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Multiple>
            } else {
                return <Single item={prop} key={index} index={index} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Single>
            }
        })
    }
    return (
        <>
            {render()}
        </>
    )
}