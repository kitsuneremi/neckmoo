import { Fragment, memo, useContext, useEffect, useRef, useState } from 'react';
import { ArrowLeftOutlined, UnorderedListOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Divider, Box, List, ListItem } from '@mui/material'
import { Router } from "next/router";
import classNames from 'classnames/bind'
import styles from '../../../styles/Nav.module.scss'
import Context from '../../../GlobalVariableStorage/Context'
import Tippy from '@tippyjs/react/headless'
import NotificationMenu from "./inside/NotificationMenu";
import AccountMenu from "./inside/AccountMenu";
import axios from 'axios';
import Link from 'next/link';

function Nav() {
    const cx = classNames.bind(styles)
    const context = useContext(Context)
    //useRef
    const searchRef = useRef()
    //useState
    const [showCollapsedSearchBox, setShowCollapsedSearchBox] = useState(false)
    const [showSearchDropdown, setShowSearchDropdown] = useState(null)
    const [searchResultObject, setSearchResultObject] = useState([])
    const [showLoading, setShowLoading] = useState(false)
    const [showClear, setShowClear] = useState(false)

    useEffect(() => {
        showLoading ? setShowClear(false) : setShowClear(true)
    }, [showLoading])

    //dropdown re-render
    useEffect(() => {
        if (context.searchvalue != '') {
            setShowLoading(true)
            axios.get(`http://localhost:5000/api/searchbar/${context.searchvalue}`)
                .then(res => {
                    if (res.data == []) {
                        setSearchResultObject([])
                    } else {
                        setSearchResultObject(res.data);
                    };
                }
                )
                .then(() => setShowLoading(false))
        }
    }, [context.searchvalue])

    useEffect(() => {
        context.searchvalue === '' ? setShowClear(false) : setShowClear(true)
        handleShowSearchAdvanced()
    }, [context.searchvalue])

    //để sau này thực hiện thao tác tìm kiếm
    const handleSearch = () => {
        if (showCollapsedSearchBox) {
            if (context.searchvalue !== '') {
                Router.push(`/result/${context.searchvalue}`)
            }
        } else {
            setShowCollapsedSearchBox(true)
        }
    }

    const handleShowSidebar = () => {
        if (showCollapsedSearchBox === true && window.innerWidth < 650) {
            return (
                <ArrowLeftOutlined className={cx('show-detail-btn')} onClick={() => { setShowCollapsedSearchBox(false) }} />
            )
        } else {
            return (
                <UnorderedListOutlined className={cx('show-detail-btn')} onClick={() => {
                    context.setFlagShowDrawer();
                    context.setFlagDetailSidebar()
                }} />
            )
        }
    }

    const handleShowSearchAdvanced = () => {
        if (context.searchvalue !== '') {
            setShowSearchDropdown(true)
        } else {
            setShowSearchDropdown(false)
        }
    }

    const handleSearchNavigate = (t) => {
        Router.push(t);
    }

    const actionRender = () => {
        let accessToken;
        if (!process.env.IS_SERVER) {
            accessToken = window.localStorage.getItem('accessToken');
            return (
                <div className={cx('actions')}>
                    <Link href={'/up'}><CloudUploadOutlined /></Link>
                    <NotificationMenu />
                    <AccountMenu />
                </div>
            )
        }
        return (
            <Link href={'/login'}>
                <button className={cx('login-button')}>đăng nhập</button>
            </Link>
        )
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('manage')}>
                    {/* menu */}
                    {handleShowSidebar()}
                    {/* logo */}
                    <Link href='/'>
                        <div className={cx('logo-wrapper')}>
                            <img src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg" className={cx('logo')} />
                            <h3 className={cx('logo-text')}>zootube</h3>
                        </div>
                    </Link>
                </div>
                {/* search */}
                <Tippy
                    content="ok"
                    visible={showSearchDropdown}
                    render={
                        attrs => (
                            <div className={cx('search-result')} {...attrs}>
                                <Box sx={{ width: '100%', minWidth: searchRef.current.offsetWidth, bgcolor: 'azure', borderRadius: '1em' }}>
                                    <nav aria-label="main mailbox folders">
                                        <List>
                                            {
                                                searchResultObject.video != undefined ? searchResultObject.video.map((video, index) => {
                                                    return (
                                                        <ListItem key={index}>
                                                            <p>{video.title}</p>
                                                        </ListItem>
                                                    )
                                                }) : <Fragment></Fragment>
                                            }
                                            <Divider />
                                            {
                                                searchResultObject != [] ? searchResultObject.map((video, index) => {
                                                    return (
                                                        <ListItem key={index} onClick={() => handleSearchNavigate(`/watch/${video.videoLink}`)}>
                                                            <p>{video.title}</p>
                                                        </ListItem>
                                                    )
                                                }) : <Fragment></Fragment>
                                            }

                                        </List>
                                    </nav>
                                </Box>
                            </div>
                        )

                    }>
                    <div className={cx('search')} ref={searchRef}>
                        <input placeholder='search here'
                            value={context.searchvalue}
                            onChange={(e) => { context.handleSearchValue(e.target.value) }}
                            onFocus={() => { handleShowSearchAdvanced() }}
                            onBlur={() => { setShowSearchDropdown(false) }} />

                        {showClear && <button className={cx('clear')} onClick={() => { context.handleSearchValue('') }}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>}
                        {showLoading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}

                        <button className={cx('search-btn')} onClick={() => { setShowSearchDropdown(false); handleSearch() }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>

                {/* action */}
                {actionRender()}
            </div>
        </header>
    );
}




export default memo(Nav);