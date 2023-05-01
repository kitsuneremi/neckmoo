import { memo } from "react";
import { Col, Row } from "antd";
import { Avatar } from "@mui/material";
import style from '../../styles/WatchComment.module.scss'
import classNames from 'classnames/bind'
function WatchVideoComment() {
    const cx = classNames.bind(style)
    return (
        <Row className={cx('comment-row')}>
            <Col span={1}>
                <Avatar className={cx('avatar')} />
            </Col>
            <Col span={23}>
                <Row>
                    {/* <p className={cx('comment-channel-name')}>erinasaiyukii</p> */}
                </Row>
                <Row style={{ height: 'fit-content', width: 'inherit' }}>
                    {/* <p className={cx('comment-text')}>this is the text write by hand</p> */}
                </Row>
                <Row>
                    <button>like</button>
                    <button style={{ marginLeft: '5px' }}>dislike</button>
                    {/* <p style={{ marginBottom: 0, marginLeft: '5px' }}>phản hồi</p> */}
                </Row>
            </Col>
        </Row>
    )
}
export default memo(WatchVideoComment)