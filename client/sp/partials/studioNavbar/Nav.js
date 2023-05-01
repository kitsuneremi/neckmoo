import classNames from 'classnames/bind'
import styles from '../../../styles/studioNav.module.scss'
import { Fragment, memo, useContext, useEffect, useRef, useState } from "react";
import { Link, redirect, Navigate, useNavigate } from "react-router-dom";
import AccountMenu from "../navbar/inside/AccountMenu";
import { ArrowLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Context from '../../../../GlobalVariableStorage/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { InboxIcon, DraftsIcon } from '@mui/icons-material';
import { Menu, Button, MenuItem, Divider, Box, List, ListItem, ListItemButton, ListItemText, ClickAwayListener } from '@mui/material'

import axios from 'axios';
function Nav() {
    const cx = classNames.bind(styles)
    const navigate = useNavigate()
    const context = useContext(Context)
    //useRef
    const searchRef = useRef(undefined)
    //useState
    const [showCollapsedSearchBox, setShowCollapsedSearchBox] = useState(false)
    const [showSearchDropdown, setShowSearchDropdown] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [searchResultObject, setSearchResultObject] = useState({})

    let searchWidth;
    searchRef != undefined ? searchWidth = 400 : searchWidth = searchRef.current.offsetWidth

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        let windowWidth = window.innerWidth
        if (windowWidth < 1300) {
            context.setFalseDetailSidebar()
        } else if (windowWidth >= 1300) {
            context.setTrueShowDetailSidebar()
        }
        context.setFalseShowDrawer()
    }, [])

    //dropdown re-render
    useEffect(() => {
        if (searchValue != '') {
            axios.get(`http://localhost:5000/api/searchbar/${searchValue}`)
                .then(res => { console.log(res.data); return res })
                .then(res => { setSearchResultObject(res.data) })
        }
    }, [searchValue])


    //để sau này thực hiện thao tác tìm kiếm
    const handleSearch = () => {
        if (showCollapsedSearchBox) {
            if (searchValue !== '') {

            }
        } else {
            setShowCollapsedSearchBox(true)
        }
    }

    const open = Boolean(anchorEl);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('manage')}>
                    {/* menu */}
                    <UnorderedListOutlined className={cx('show-detail-btn')} onClick={() => {
                        context.setFlagDetailSidebar();
                    }} />

                    {/* logo */}
                    <Link to='/'>
                        <div className={cx('logo-wrapper')}>
                            <img src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg" className={cx('logo')} />
                            <h3 className={cx('logo-text')}>Studio</h3>
                        </div>
                    </Link>
                </div>
                {/* search */}
                <Tippy
                    content="ok"
                    visible={showSearchDropdown}
                    render={
                        attrs => (
                            <div tabIndex='1' className={cx('search-result')} {...attrs}>
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
                                                searchResultObject.channel != undefined ? searchResultObject.channel.map((channel, index) => {
                                                    return (
                                                        <ListItem key={index}>
                                                            <p>{channel.name}</p>
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
                        <input placeholder='search here' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onFocus={() => { setShowSearchDropdown(true) }} onBlur={() => { setShowSearchDropdown(false) }} />
                    </div>
                </Tippy>

                {/* action */}
                <div className={cx('actions')}>
                    <AccountMenu />
                </div>

            </div>


        </header>
    );
}

export default memo(Nav);