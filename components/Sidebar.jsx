"use client"
import classNames from "classnames/bind"
import styles from '@/styles/sidebar.module.scss'
import { useState, useContext, useEffect, useLayoutEffect } from "react"
import { HomeOutlined, ClockCircleOutlined, CoffeeOutlined, HistoryOutlined, BookOutlined } from '@ant-design/icons'
import { useRouter } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import Context from "@/GlobalVariableProvider/Context"
import axios from "axios"

const cx = classNames.bind(styles)
const Single = (prop) => {
    const router = useRouter()
    return (
        <div onClick={() => { router.push(prop.item.href) }} className={clsx({ [cx('parent-box')]: prop.tab !== prop.index }, { [cx('selected-parent-box')]: prop.tab === prop.index })}>
            {prop.item.icon}
            <div className={cx('title')}>{prop.full ? prop.item.name : ""}</div>
        </div>
    )
}

const Multiple = (prop) => {
    const [show, setShow] = useState(prop.item.show)
    useEffect(() => {
        if (!prop.full) { setShow(false) }
    }, [prop.full])

    return (
        <>
            <div className={clsx({ [cx('parent-box')]: prop.tab !== prop.index }, { [cx('selected-parent-box')]: prop.tab === prop.index })} onClick={() => { setShow(!show) }}>
                {prop.item.icon}
                <div className={cx('title')}>{prop.full ? prop.item.name : ""}</div>
            </div>
            {show && prop.item.child.map((x, index) => {
                return <Link href={`/channel/${x.tagName}`} key={index}><div className={cx('item-child')}>{x.name}</div></Link>
            })}
        </>
    )
}

export default function Sidebar() {
    const [selectedTab, setSelectedTab] = useState(-1)
    const [listSub, setListSub] = useState([])
    const context = useContext(Context)

    useLayoutEffect(() => {
        if (context.ses) {
            axios.get('/api/subcribe/findmany', {
                params: {
                    accountId: context.ses.user.id
                }
            }).then(res => setListSub(res.data))
        }
    }, [context.ses])
    const props = [
        { name: 'Trang chủ', icon: <HomeOutlined className={cx('icon')} />, href: '/' },
        { name: 'Shorts', icon: <ClockCircleOutlined className={cx('icon')} />, href: '/shorts' },
        {
            name: 'Kênh đăng ký',
            icon: <CoffeeOutlined className={cx('icon')} />,
            child: listSub,
            ref: null,
            show: true
        },
        { name: 'Video đã xem', icon: <HistoryOutlined className={cx('icon')} />, href: '/history' },
        { name: 'Thư viện', icon: <BookOutlined className={cx('icon')} />, href: '/libary' }
    ]

    const render = () => {
        return props.map((prop, index) => {
            if (prop.child) {
                return <Multiple item={prop} key={index} index={index} full={!context.collapseSidebar} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Multiple>
            } else {
                return <Single item={prop} key={index} index={index} full={!context.collapseSidebar} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Single>
            }
        })
    }
    return (
        <div className={cx('box')}>
            {render()}
        </div>
    )
}