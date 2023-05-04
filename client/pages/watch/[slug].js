import { Button, ButtonGroup } from "react-bootstrap"
import { Avatar } from "@mui/material";
import { useState, useEffect, useRef, useContext, memo } from "react"
import { Space, Row, Col, Drawer } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { CloseOutlined, LikeOutlined, DislikeFilled, ScissorOutlined, ArrowRightOutlined, SaveOutlined, LikeFilled, DislikeOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import Context from '../../GlobalVariableStorage/Context'
import Item from "../../sp/partials/sidebar/SideBarItem"
import style from '../../styles/Watch.module.scss';
import WatchVideoSidebar from "../../sp/inside/VideoSidebar";
import WatchVideoComment from "../../sp/inside/VideoComment";
import WatchVideoCommentInput from "../../sp/inside/VideoCommentInput";
import WatchVideoListSidebarBox from "../../sp/inside/VideoListSidebarBox";
import Navx from "../../sp/partials/navbar/Nav";
import clsx from "clsx";
import VideoDescription from "../../sp/inside/VideoDescription";
import axios from "axios";
import classNames from 'classnames/bind'


export async function getServerSideProps({ params }) {
    const slug = params.slug;
    library.add(fas, faTwitter, faFontAwesome)
    try {
        const [channelRes] = await Promise.all([
            axios.get(`http://localhost:5000/api/channel/test/${slug}`)
        ]);

        return {
            props: {
                channelData: channelRes.data,
            }
        };
    } catch (error) {
        return {
            props: {
                error: error.message
            }
        };
    }
}

function Watch({ channelData }) {
    const cx = classNames.bind(style)
    const router = useRouter()
    const slug = router.query.slug
    //useContext
    const context = useContext(Context)

    //useState
    const [watchDpHandler, setWatchDpHandler] = useState(false)
    const [maxVideoWidth, setMaxVideoWidth] = useState(17)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [sub, SetSub] = useState(false);
    const [play, setPlay] = useState(true);
    const [fs, setFullscreen] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedBelowTab, setSelectedBelowTab] = useState(0)
    const [volume, setVolume] = useState(1)
    const [cc, setCC] = useState(false)
    //useRef
    const playerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 1200) {
            setWatchDpHandler(true)
            setMaxVideoWidth(24)
        } else {
            setWatchDpHandler(false)
            setMaxVideoWidth(17)
        }
    }, [])

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                e.target.value += ' ';
                const video = playerRef.current
                if (video.paused) {
                    video.play()
                    setPlay(true)
                } else {
                    video.pause()
                    setPlay(false)
                }
            }
        };

        document.addEventListener('keydown', handleSpacebar);

        return () => {
            document.removeEventListener('keydown', handleSpacebar);
        };
    }, []);

    useEffect(() => {
        if (playerRef.current == null) return;
        playerRef.current.volume = volume
    }, [volume])

    const thisIsDrawer = () => {
        if (context.drawerstatus) {
            let drawer = <Drawer
                title="Basic Drawer"
                placement='left'
                closable={true}
                closeIcon={true}
                width={200}
                onClose={() => {
                    context.setFalseShowDrawer();
                }}
                open={context.drawerstatus}
                extra={
                    <Space>
                        <CloseOutlined onClick={() => { context.setFalseShowDrawer(); }} />
                    </Space>
                }
                className={clsx(
                    { [style.dark]: !context.mode },
                    { [style.light]: context.mode }
                )}

            >
                <Item show={true}></Item>
            </Drawer>;
            return drawer
        } else {
            return (
                <></>
            )
        }
    }

    const handleLike = () => {
        return (
            <ButtonGroup className={cx('like-button-group')}>
                <Button className={cx('like-button')} onClick={() => { setLike(!like); setDislike(false) }}>
                    {like ? <LikeFilled /> : <LikeOutlined />}
                </Button>
                <Button className={cx('dislike-button')} onClick={() => { setDislike(!dislike); setLike(false) }}>
                    {dislike ? <DislikeFilled /> : <DislikeOutlined />}
                </Button>
            </ButtonGroup>
        )
    }

    const handleSubscribe = () => {
        SetSub(!sub)
    }

    const volumex = () => {
        if (volume > 0.5) {
            return (
                <FontAwesomeIcon icon="fa-solid fa-volume-high" size="2xl" />
            )
        } else if (volume > 0) {
            return (
                <FontAwesomeIcon icon="fa-solid fa-volume-low" size="2xl" />
            )
        } else {
            return (
                <FontAwesomeIcon icon="fa-solid fa-volume-xmark" size="2xl" />
            )
        }
    }

    const otherVideoRender = () => {
        const viewTab = () => {
            if (selectedTab === 0) {
                return <WatchVideoSidebar />
            } else if (selectedTab === 1) {
                return <WatchVideoSidebar />
            } else {
                return <WatchVideoSidebar />
            }
        }
        const btn = [
            {
                'title': 'tất cả',
            },
            {
                'title': 'mới',
            },
            {
                'title': 'đã xem',
            }
        ]
        return (
            <div className={cx('sidebar-below')}>
                <div className={cx('top-housing')}>
                    {btn.map((btn, index) => {
                        return (
                            <button key={index} className={
                                clsx({ [cx('tab-button')]: (selectedTab !== index) }, { [cx('selected-tab-button')]: (selectedTab === index) })
                            } onClick={() => { setSelectedTab(index) }}>{btn.title}</button>
                        )
                    })}
                </div>
                <div className={cx('bottom-housing')}>
                    {viewTab()}
                </div>
            </div>
        )
    }

    const belowRender = () => {
        const viewTab = () => {
            if (selectedBelowTab === 0) {
                return <>
                    <WatchVideoCommentInput />
                    <WatchVideoComment />
                </>
            } else if (selectedBelowTab === 1) {
                return <WatchVideoListSidebarBox />
            } else {
                let p = otherVideoRender()
                return p
            }
        }
        const btn = [
            {
                'title': 'bình luận',
            },
            {
                'title': 'danh sách phát',
            },
            {
                'title': 'video khác',
            }
        ]
        return (
            <div className={cx('sidebar-below')}>
                <div className={cx('top-housing')}>
                    {btn.map((btn, index) => {
                        return (
                            <button key={index} className={
                                clsx({ [cx('tab-button')]: (selectedBelowTab !== index) }, { [cx('selected-tab-button')]: (selectedBelowTab === index) })
                            } onClick={() => { setSelectedBelowTab(index) }}>{btn.title}</button>
                        )
                    })}
                </div>
                <div className={cx('bottom-housing')}>
                    {viewTab()}
                </div>
            </div>
        )
    }

    async function handleCopy() {
        try {
            let a = window.location.href
            await navigator.clipboard.writeText(`https://erinasaiyukii.com/watch/${a.split('/')[4]}`);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    const handleFullScreen = () => {
        const videox = videoRef.current;
        if (fs) {
            if (videox.requestFullscreen) {
                videox.requestFullscreen();
            } else if (videox.mozRequestFullScreen) {
                videox.mozRequestFullScreen();
            } else if (videox.webkitRequestFullscreen) {
                videox.webkitRequestFullscreen();
            } else if (videox.msRequestFullscreen) {
                videox.msRequestFullscreen();
            }
        } else {
            document.exitFullscreen();
        }
    };

    const controlStyle = {
        'color': 'aliceblue',
        'fontSize': '2.2em',
    }

    return (
        <div className="App" style={{ overflow: 'hidden' }}>
            {/* navbar */}
            <Navx />

            {/*sidebar*/}
            {thisIsDrawer()}

            {/*content*/}
            <Row className={cx('main-content')}>
                <Col span={maxVideoWidth} style={{ height: 'inherit' }}>
                    <div className={cx('video-box')} ref={videoRef}>
                        <div className={cx('timeline')}>

                        </div>
                        <div className={cx('video-player-box')}>
                            <video
                                className={cx('video-player')}
                                src={`http://localhost:5000/api/file/video/${slug}`}
                                allowFullScreen
                                autoPlay
                                ref={playerRef}
                            ></video>
                        </div>

                        <div className={cx('control')}>
                            <div className={cx('left-control')}>
                                {
                                    !play ? <FontAwesomeIcon icon="fa-solid fa-play" size="2xl" onClick={() => { playerRef.current.play(); setPlay(true) }} /> : <FontAwesomeIcon icon="fa-solid fa-pause" size="2xl" onClick={() => { playerRef.current.pause(); setPlay(false) }} />
                                }
                                <FontAwesomeIcon icon="fa-solid fa-forward-step" size="2xl" />
                                <>
                                    {volumex()}
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        className={cx('volume-controller')}
                                        onChange={(e) => { setVolume(e.target.value) }}
                                        defaultValue="1"
                                    />
                                </>
                            </div>
                            <div className={cx('right-control')}>
                                {cc ? <FontAwesomeIcon icon="fa-solid fa-closed-captioning" size="2xl" onClick={() => {setCC(false)}}/> : <FontAwesomeIcon icon="fa-regular fa-closed-captioning"  size="2xl" onClick={() => {setCC(true)}}/>}
                                <FontAwesomeIcon icon="fa-solid fa-gear" size="2xl" />
                                {
                                    !fs
                                        ?
                                        <div onClick={() => { setFullscreen(true); handleFullScreen() }}><FullscreenExitOutlined style={controlStyle} /></div>
                                        :
                                        <div onClick={() => { setFullscreen(false); handleFullScreen() }}><FullscreenOutlined style={controlStyle} /></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <Row>
                            {<h5>{channelData.title}</h5>}
                        </Row>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Col span={10}>
                                <Row style={{ height: '40px' }}>
                                    <Col className="me-1">
                                        <Avatar />
                                    </Col>
                                    <Col className="me-4">
                                        <Row>{channelData ? <p className="m-0">{channelData.name}</p> : <></>}</Row>
                                        <Row><p className="m-0">44.5N</p></Row>
                                    </Col>
                                    <Col className={cx('sub-button')}>
                                        <a type="button" className={`${clsx({ [style.sub]: sub }, { [style.unsub]: !sub })}`}
                                            onClick={() => {
                                                handleSubscribe()
                                            }}
                                        >
                                            {sub ? 'đăng ký' : 'đã đăng ký'}
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={14} style={{ textAlign: 'end' }} className={cx('below-video-button')}>
                                {handleLike()}
                                <a type="button" className={cx('share')} onClick={() => { handleCopy() }}><ArrowRightOutlined />share</a>
                                <a type="button" className={cx('create-short')}><ScissorOutlined />tạo đoạn video</a>
                                <a type="button" className={cx('save')}><SaveOutlined />save</a>
                            </Col>
                        </Row>
                    </div>
                    <VideoDescription value={channelData.des}></VideoDescription>
                    {
                        maxVideoWidth === 17 ?
                            <div>
                                <WatchVideoCommentInput />
                                <WatchVideoComment />
                            </div>
                            :
                            <div></div>
                    }
                    <div className={clsx(
                        { [style.true]: watchDpHandler },
                        { [style.false]: !watchDpHandler }
                    )}>
                        {belowRender()}
                    </div>
                </Col>
                <Col span={maxVideoWidth === 17 ? 1 : 0}></Col>
                <Col span={maxVideoWidth === 17 ? 6 : 0} style={{ height: 'inherit' }}>
                    {maxVideoWidth === 17 ?
                        <>
                            <WatchVideoListSidebarBox />
                            {otherVideoRender()}
                        </>
                        :
                        <div></div>
                    }

                </Col>
            </Row>
        </div>
    );
}
export default memo(Watch);

