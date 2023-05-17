import { Card, Image } from "react-bootstrap"
import { Row, Col } from 'antd'
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react'
import Link from 'next/link';
import style from '../../styles/VideoItem.module.scss'
import axios from "axios"
import classNames from "classnames/bind";
import { useRouter } from 'next/router';
function VideoItem(props) {
    const cx = classNames.bind(style)
    const router = useRouter();
    const [img, setImg] = useState()
    const [data, setData] = useState({})
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/fileout/image/${props.link}`, { responseType: 'blob' })
            .then(res => {
                var binaryData = [];
                binaryData.push(res.data);
                setImg(window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
            })
    }, [router.query])

    return (
        <Col className={cx('box')}>
            <Card className='p-0' style={{ width: '100%' }}>
                <Link href={`/watch/${props.link}`}>
                    <Card.Img variant="top" className={cx('thumbnail')}
                        src={img}
                    />
                </Link>
                <Card.Body as={Row} className={`card-body ${cx('card-body')}`}>
                    <Col span={4}>
                        <Image className={cx('icon')}
                            src={``}
                        ></Image>
                    </Col>
                    <Col span={20}>
                        <Link href={`/watch/${props.link}`}>
                            <div className="text-start" style={{ overflow: 'hidden' }}>
                                <Typography variant="inherit" className={cx('title')} noWrap>
                                    {props.name}
                                </Typography>
                            </div>
                            <div className={cx('below')}>
                                <p className={`mb-0 p-0 text-wrap ${cx('video-details')}`}>{props.channelName}</p></div>
                            <div className={cx('below')}>
                                <p className={`mb-0 p-0 text-wrap ${cx('video-details')}`}>{props.view}</p>
                                <p className={`mb-0 p-0 text-wrap ${cx('video-details')}`}>{props.status}</p>
                            </div>
                        </Link>
                    </Col>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(VideoItem)