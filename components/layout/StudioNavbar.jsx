'use client'
import classNames from "classnames/bind"
import styles from '@/styles/navbar.module.scss'
import Link from "next/link"
import { Router } from "next/router"
import { useState, useEffect, useRef } from "react"
import { IeOutlined, LeftOutlined, CloseOutlined, LoadingOutlined, SearchOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from '@/redux/storage';
import { close, reverse, open } from '@/redux/features/sidebar-slice';
const cx = classNames.bind(styles)


const AccountMenu = ({ session }) => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            menu.style.left = `-220px`;
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    return (
        <>
            <button ref={buttonRef} onClick={() => { setShow(!show) }} className={cx('button')}>
                <img src="" className={cx('avatar')} />
            </button>
            {show ? <div className={cx('dropdown')} ref={menuRef}>
                <div className={cx('infomation-box')}>
                    <img src="" className={cx('avatar')} />
                    <div className={cx('infomation')}>
                        <p>@{session ? session.user.name : ''}</p>
                        <p>{session ? session.user.email : ''}</p>
                    </div>
                </div>
                <div className={cx('menu-box')}><p className={cx('title')}>Kênh của bạn</p></div>
                <div className={cx('menu-box')}><p className={cx('title')}>cài đặt</p></div>
                <div className={cx('menu-box')}><p className={cx('title')}>chế độ sáng</p></div>
                <div className={cx('menu-box')}><p className={cx('title')} onClick={() => { signOut() }}>đăng xuất</p></div>
            </div> : <></>}
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


function Navbar() {
    const [showClear, setShowClear] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])

    const dispatch = useDispatch();
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)

    const searchDropdownRef = useRef(null)
    const searchInputRef = useRef(null)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (searchValue.trim() === '') {
            setShowSearchResult(false)
            setShowClear(false)
        } else {
            setShowSearchResult(true)
            setShowClear(true)
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
                    <LeftOutlined onClick={() => { dispatch(reverse()) }} className={cx('sidebar-button')} />
                    <Link href={'/'}><IeOutlined className={'logo'} /></Link>
                </div>
                <div className={cx('search-box')}>
                    <div className={cx('search')}>
                        <input className={cx('input')} ref={searchInputRef} value={searchValue} onFocus={() => { setShowSearchResult(true) }} onBlur={() => { setShowSearchResult(false) }} onChange={(e) => { setSearchValue(e.target.value) }} />
                        {showClear && <button className={cx('clear')} onClick={() => { setSearchValue('') }}>
                            <CloseOutlined />
                        </button>}
                        {showLoading && <LoadingOutlined className={cx('spinner')} />}
                        <SearchOutlined onClick={() => { handleSearch() }} className={cx('search-button')} />
                    </div>
                    {showSearchResult && <div ref={searchDropdownRef} className={cx('search-result')}>
                        asdas
                    </div>}
                </div>
                <div className={cx('action-box')}>
                    <Link href={'/studio/upload'}><UploadOutlined /></Link>
                    <div className={cx('notification-box')}>
                        <NotificationMenu />
                    </div>

                    <div className={cx('account-menu-box')}>
                        <AccountMenu session={session} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar