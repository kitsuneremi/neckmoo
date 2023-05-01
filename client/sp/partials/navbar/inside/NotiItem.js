import {Row} from "antd";
import {MenuItem, Typography} from "@mui/material";
import {MoreOutlined} from "@ant-design/icons";
import * as React from "react";
import style from '../../../../styles/NotificationMenu.module.scss'

export default function NotiItem (props){
    // props.img = 'https://i.ytimg.com/vi/m7bgcLmNCXE/hqdefault.jpg'
    // props.channelIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpwEa1IocYuZzZx3GF6p8h6NYsGarg9BXrjt5HuLbnPJSswcrnkZKB2BRaYP4XXGEDAI&usqp=CAU"
    return(
        <MenuItem className={`${style.mainItem}`}>
            <Row className={`${style.listItemIcon}`}>.</Row>
            <Row className={`${style.listItemIcon}`}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpwEa1IocYuZzZx3GF6p8h6NYsGarg9BXrjt5HuLbnPJSswcrnkZKB2BRaYP4XXGEDAI&usqp=CAU"
                     className={`${style.channelIcon}`}
                />
            </Row>
            <Row className={`${style.theThird}`}>
                <Row>
                    <Typography className={`${style.mainItemTitle}`} variant="inherit" noWrap>
                        {props.title}
                    </Typography>
                </Row>
                <Row className={`${style.mainItemText}`}>{props.status}</Row>
            </Row>
            <Row className="theFourth">
                <img src='https://i.ytimg.com/vi/m7bgcLmNCXE/hqdefault.jpg' className={`${style.mainItemImg}`}/>
            </Row>
            <Row><MoreOutlined /></Row>
        </MenuItem>
    )
}