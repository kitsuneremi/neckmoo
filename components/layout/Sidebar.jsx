"use client"
import classNames from "classnames/bind"
import styles from '@/styles/component/sidebar.module.scss'
import { useState, useEffect, useLayoutEffect, Suspense } from "react"
import { HomeOutlined, ClockCircleOutlined, CoffeeOutlined, HistoryOutlined, BookOutlined } from '@ant-design/icons'
import { useRouter } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import axios from "axios"
import { useSession } from 'next-auth/react'
import { AppDispatch, useAppSelector } from '@/redux/storage'
import { useDispatch } from 'react-redux'

const cx = classNames.bind(styles)



const Single = (prop) => {
    return (
        <Link href={prop.item.href}>
            <div className={clsx({ [cx('parent-box')]: prop.tab !== prop.index }, { [cx('selected-parent-box')]: prop.tab === prop.index })}>
                {prop.item.icon}
                <div className={cx('title')}>{prop.full ? prop.item.name : ""}</div>
            </div>
        </Link>
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
    return (
        <div className={cx('box')}>
            <Render />
        </div>
    )
}



const Render = () => {
    const [selectedTab, setSelectedTab] = useState(-1)
    const [listSub, setListSub] = useState([]);

    const { data: session } = useSession()

    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)

    useEffect(() => {
        if (session) {
            axios.get('/api/subcribe/findmany', {
                params: {
                    accountId: session.user.id
                }
            }).then(res => setListSub(res.data))
        }
    }, [])
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

    return props.map((prop, index) => {
        if (prop.child) {
            return <Suspense fallback={<div>loading...</div>} key={index}><Multiple item={prop} key={index} index={index} full={sidebar} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Multiple></Suspense>
        } else {
            return <Suspense fallback={<div>loading...</div>} key={index}><Single item={prop} key={index} index={index} full={sidebar} tab={selectedTab} onClick={() => { setSelectedTab(index) }}></Single></Suspense>
        }
    })
}