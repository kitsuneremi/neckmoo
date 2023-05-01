import {Col, Divider, Row} from "antd";
import { memo, useContext } from "react";
import style from '../../../../styles/SidebarItem.module.scss'
import {MenuOutlined} from "@ant-design/icons";
import Context from "../../../../../GlobalVariableStorage/Context";
import clsx from "clsx";
function SubcribedChannel(props) {
    const context = useContext(Context)
    return (
        <Row className={`${style.sideRow} ${clsx(
            {[style.dark] : !context.mode},
            {[style.light] : context.mode}
        )}`}>
            <Col className={`${style.iconBox}`}><MenuOutlined/></Col>
            {props.show ? <Col className={`text-start ${style.fixText} ${style.textBox}`}>{props.name}</Col> : <></>}
        </Row>
    )
}


export default memo(SubcribedChannel)