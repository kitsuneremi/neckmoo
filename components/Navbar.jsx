'use client'
import classNames from "classnames/bind"
import styles from '@/styles/navbar.module.scss'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useContext } from "react"
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { IeOutlined, LeftOutlined, CloseOutlined, LoadingOutlined, SearchOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons'
import Context from "@/GlobalVariableProvider/Context"
import axios from "axios"
const cx = classNames.bind(styles)

const AccountMenu = ({ session }) => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const router = useRouter();
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            menu.style.left = `-220px`;
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    useEffect(() => {
        if (session && session.user) {
            axios.get(`/api/channel/getdatabyaccountid`,{
                params: {
                    accountId: session.user.id
                }
            }).then(res => { setChannelData(res.data) })
        }
    }, [session])

    const handlePush = () => {
        if (channelData != null) {
            router.push(`/channel/${channelData.tagName}`)
        } else {
            router.push('/registerchannel')
        }
    }

    return (
        <>
            <button ref={buttonRef} onClick={() => { setShow(!show) }} className={cx('button')}>
                <img src="" className={cx('avatar')} />
            </button>
            {show ? <ul className={cx('dropdown')} ref={menuRef}>
                <li className={cx('infomation-box')}>
                    <img src="" className={cx('avatar')} />
                    <div className={cx('infomation')}>
                        <p>@{session ? session.user.name : ''}</p>
                        <p>{session ? session.user.email : ''}</p>
                    </div>
                </li>
                <li className={cx('menu-box')} onClick={() => { handlePush() }}><p className={cx('title')}>Kênh của bạn</p></li>
                <li className={cx('menu-box')}><p className={cx('title')}>cài đặt</p></li>
                <li className={cx('menu-box')}><p className={cx('title')}>chế độ sáng</p></li>
                <li className={cx('menu-box')}><p className={cx('title')} onClick={() => { signOut() }}>đăng xuất</p></li>
            </ul> : <></>}
        </>
    )
}

const NotificationMenu = () => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            menu.style.left = `-180px`;
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    return (
        <>
            <button ref={buttonRef} onClick={() => { setShow(!show) }} className={cx('button')}>
                <BellOutlined />
            </button>

            {show ? <div className={cx('dropdown')} ref={menuRef}>
                menu
            </div> : <></>}
        </>
    )
}

const ActionIsLogged = (session) => {
    const router = useRouter();
    if (session && session.user) {
        return <div className={cx('action-box')}>
            <Link href={'/studio/upload'}><UploadOutlined /></Link>
            <div className={cx('notification-box')}>
                <NotificationMenu />
            </div>

            <div className={cx('account-menu-box')}>
                <AccountMenu session={session} />
            </div>

        </div>
    } else {
        return <button className={cx('login-button')} onClick={() => { router.push('/register') }}>đăng nhập</button>
    }
}


function Navbar() {
    const context = useContext(Context)
    const [showClear, setShowClear] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])
    const searchDropdownRef = useRef(null)
    const searchInputRef = useRef(null)
    const router = useRouter()
    useEffect(() => {
        if (searchValue.trim() === '') {
            setShowSearchResult(false)
            setShowClear(false)
        } else {
            setShowSearchResult(true)
            setShowClear(true)
            axios.get(`/api/video/containkey?keyword=${searchValue}`)
                .then(res => setSearchData(res.data))
        }
    }, [searchValue])

    const handleSearch = () => {
        setShowSearchResult(false)
        if (searchValue !== '') {
            router.push(`/result/${encodeURIComponent(searchValue)}`)
        }
    }

    return (
        <nav className={'navbar'}>
            <div className={cx('wrapper')}>
                <div className={cx('navigation-box')}>
                    <LeftOutlined onClick={() => { context.setCollapseSidebar(!context.collapseSidebar) }} className={cx('sidebar-button')} />
                    <Link href={'/'}><IeOutlined className={'logo'} /></Link>
                </div>
                <div className={cx('search-box')} onFocus={() => { setShowSearchResult(true) }} onBlur={() => { setShowSearchResult(false) }}>
                    <div className={cx('search')}>
                        <input className={cx('input')} ref={searchInputRef} value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                        {showClear && <button className={cx('clear')} onClick={() => { setSearchValue('') }}>
                            <CloseOutlined />
                        </button>}
                        {showLoading && <LoadingOutlined className={cx('spinner')} />}
                        <SearchOutlined onClick={() => { handleSearch() }} className={cx('search-button')} />
                    </div>
                    {showSearchResult && <ul ref={searchDropdownRef} className={cx('search-result')}>
                        {searchData != null ? searchData.map((data, index) => {
                            return <li key={index} className={cx('result')}>{data.title}</li>
                        }) : <></>}
                    </ul>}
                </div>
                {ActionIsLogged(context.ses)}
            </div>
        </nav>
    )
}

export default Navbar