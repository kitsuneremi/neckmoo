import { Fragment, useState } from 'react'
import {Avatar, Menu, MenuItem, Divider, IconButton, Tooltip} from '@mui/material'
import {Settings} from '@mui/icons-material'
import {Row} from 'antd'
import {NotificationOutlined} from '@ant-design/icons'
import style from '../../../../styles/NotificationMenu.module.scss'
import NotiItem from './NotiItem'

export default function AccountMenu() {
    const [showDropdown, setShowDropdown] = useState(null);
    const open = Boolean(showDropdown);
    const handleClick = (event) => {
        setShowDropdown(event.currentTarget);
    };
    const handleClose = () => {
        setShowDropdown(null);
    };
    return (
        <Fragment>
            <Tooltip title="Notifications">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : 'false'}
                >
                    <NotificationOutlined />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={showDropdown}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
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
            >
                <MenuItem className={`${style.header}`}>
                    <Row className={`${style.headerText}`}><p className={`${style.topText}`}>Notifications</p></Row>
                    <Row className={`${style.headerIcon}`}><Settings fontSize="small" href=""/></Row>
                </MenuItem>
                <Divider />
                <NotiItem title = "this is order" status = "2h ago"  img = "" channelIcon = ""/>
                <NotiItem title = "this is order from vietnam ok????" status = "1h ago"  img = "" channelIcon = ""/>
                <NotiItem title = "this is orderasbjkdhjkasjdkaksjdhjkashjkdhaksjhdajkshdjkahkjdhajkshdjkahsjkdhajksdjkasfgyqwigfiyuqa" status = "24m ago"  img = "" channelIcon = ""/>
                <NotiItem title = "yeah địt mẹ mấy thằng óc buồi thua rồi, vâng yeah vô địch rồi, vô địch rồi, vô địch rồi" status = "1d ago"  img = "" channelIcon = ""/>
            </Menu>
        </Fragment>
    );
}