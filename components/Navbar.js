'use client'
import classNames from "classnames/bind"
import styles from '@/styles/navbar.module.scss'
import Link from "next/link"
import { Router } from "next/router"
import { useState, useEffect, useRef, useContext } from "react"
import { IeOutlined, LeftOutlined, CloseOutlined, LoadingOutlined, SearchOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons'
import { signIn, signOut, useSession } from 'next-auth/client';
import Context from "@/GlobalVariableProvider/Context"
const cx = classNames.bind(styles)


const AccountMenu = () => {
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
                        <p>lily</p>
                        <p>@lily2811</p>
                        <p>lilypeachew@gmal.com</p>
                    </div>
                </div>
                <div className={cx('menu-box')}><p className={cx('title')}>Kênh của bạn</p></div>
                <div className={cx('menu-box')}><p className={cx('title')}>cài đặt</p></div>
                <div className={cx('menu-box')}><p className={cx('title')}>chế độ sáng</p></div>
                <div className={cx('menu-box')}><p className={cx('title')}>đăng xuất</p></div>
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

const ActionIsLogged = () => {
    const [session, loading] = useSession();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <button className={cx('login-button')}>đăng nhập</button>
        );
    }

    return (
        <div className={cx('action-box')}>
            <Link href={'/studio/upload'}><UploadOutlined /></Link>
            <div className={cx('notification-box')}>
                <NotificationMenu />
            </div>

            <div className={cx('account-menu-box')}>
                <AccountMenu />
            </div>

        </div>
    );
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
            Router.push(`/result/${encodeURIComponent(searchValue)}`)
        }
    }

    // useEffect(() => {
    //     if (localStorage.getItem('id') && localStorage.getItem('id') !== 'undefined') {

    //     }
    // }, [])

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
                    {showSearchResult && <div ref={searchDropdownRef} className={cx('search-result')}>
                        asdas
                    </div>}
                </div>
                {/* {localStorage && !localStorage.getItem('id') ? <div className={cx('action-box')}>
                    <Link href={'/studio/upload'}><UploadOutlined /></Link>
                    <div className={cx('notification-box')}>
                        <NotificationMenu />
                    </div>

                    <div className={cx('account-menu-box')}>
                        <AccountMenu />
                    </div>

                </div> : <button className={cx('login-button')}>đăng nhập</button>} */}
                {ActionIsLogged}
            </div>
        </nav>
    )
}

export default Navbar