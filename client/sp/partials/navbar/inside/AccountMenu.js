import { Fragment, useContext, useState, useEffect, memo } from "react";
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Container, Tooltip } from '@mui/material'
import { PersonAdd, Settings, Logout, CheckOutlined, CloseOutlined } from '@mui/icons-material'
import { Row, Switch } from 'antd'
import style from '../../../../styles/AccountMenu.module.scss'
import Context from '../../../../GlobalVariableStorage/Context'
import axios from "axios";
import Router from 'next/router';
import classNames from 'classnames/bind'

function AccountMenu() {
    const cx = classNames.bind(style)
    const context = useContext(Context)

    const [showDropdown, setShowDropdown] = useState(null);
    const [accountData, setAccountData] = useState(null);

    const open = Boolean(showDropdown);
    const handleClick = (event) => {
        setShowDropdown(event.currentTarget);
    };
    const handleClose = () => {
        setShowDropdown(null);
    };

    const handleLogout = async () => {
        const instance = axios.create({
            baseURL: 'http://localhost:5000/api/sign/logout',
        });

        instance.interceptors.request.use(
            async function (config) {
                let a = localStorage.getItem('accessToken')
                let f = new FormData();
                f.append('refreshToken', localStorage.getItem('refreshToken'));
                f.append('accessToken', localStorage.getItem('accessToken'));
                f.append('username', localStorage.getItem('username'));
                await axios.post('http://localhost:5000/api/sign/token', f)
                    .then(res => { localStorage.setItem('accessToken', res.data.accessToken); localStorage.setItem('refreshToken', res.data.refreshToken); return res })
                    .then(res => { config.headers.Authorization = `Bearer ${res.data.accessToken}`; })
                let f1 = new FormData();
                let b = localStorage.getItem('accessToken');
                console.log(a == b)
                f1.append('username', localStorage.getItem('username'))
                f1.append('accessToken', localStorage.getItem('accessToken'))
                f1.append('refreshToken', localStorage.getItem('refreshToken'))
                config.data = f1;
                return config;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
                return Promise.reject(error);
            }
        );
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        Router.reload()
    }

    useEffect(() => {
        let session = localStorage.getItem('username')
        if (session) {
            axios.get(`http://localhost:5000/api/account/${session}`)
                .then(res => { setAccountData(res.data);})
        }

    }, [])

    return (
        <Fragment>
            <Tooltip title="Account settings" className={cx('tooltip')}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : 'false'}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>

                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={showDropdown}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                className={context.mode ? cx('light') : cx('dark')}
            >
                <Container style={{ padding: 0 }} className={cx('container')}>
                    <MenuItem>
                        <Row style={{ display: "flex" }}><Avatar /></Row>
                        {accountData ? <Row style={{ display: "inline-block" }}>
                            <p className={cx('text')}>{accountData.name}</p>
                            <p className={cx('text')}>{accountData.email}</p>
                            <a className={cx('text')}>Quản lý tài khoản google của bạn</a>
                        </Row> : <Row>loading...</Row>}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')}>Kênh của bạn</p>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')}>Creator Studio</p>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')}>Chuyển đổi tài khoản</p>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')}>Chế độ sáng/tối</p>
                        <Switch style={{ marginLeft: '30px' }}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                            onClick={() => { context.handleChangeMode() }}
                        />
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')}>cài đặt</p>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <p className={cx('body-text')} onClick={() => { handleLogout() }}>
                            đăng xuất
                        </p>
                    </MenuItem>
                </Container>
            </Menu>
        </Fragment>
    );
}
export default memo(AccountMenu)