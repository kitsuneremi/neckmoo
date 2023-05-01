import { memo } from 'react'
import { Col, Image, Row } from "antd";

function WatchVideoSidebar() {
    return (
        <Row className={`mt-3`}>
            <Col span={11}>
                <Image
                    preview={false}
                    src={`https://upload-os-bbs.hoyolab.com/upload/2022/09/10/149514961/ffe294e46c8f5d05cb90e40cdae34889_1303922985347341305.png?x-oss-process=image/resize,s_1000/quality,q_80/auto-orient,0/interlace,1/format,png`}
                />
            </Col>
            <Col span={13}>
                <Row><p>stream 9/2 | xem rank hàn 13.3</p></Row>
                <Row><p>văn tùng</p></Row>
            </Col>
        </Row>
    )
}

export default memo(WatchVideoSidebar)