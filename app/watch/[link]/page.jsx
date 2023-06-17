"use client";
import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { useRouter } from "next/navigation";
import { CaretRightOutlined, PauseOutlined, StepForwardOutlined, CloseOutlined, RightOutlined, LikeFilled, DislikeFilled, ShareAltOutlined, EllipsisOutlined, DislikeOutlined, LikeOutlined, FilterOutlined, QuestionOutlined, MehOutlined, LockOutlined, IeOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/watch.module.scss";
import clsx from "clsx";
import axios from "axios";
import classNames from "classnames/bind";
import VideoComment from '@/components/inside/VideoComment';

const cx = classNames.bind(style);

const CommentZone = ({ videoInfo, session }) => {
    const [value, setValue] = useState("");
    const [change, setChange] = useState(true);
    const [listComment, setListComment] = useState([]);


    const handleCreateComment = () => {
        if (session) {
            axios.post("/api/comment/create", {
                accountId: session.user.id,
                videoId: videoInfo.id,
                referenceId: null,
                content: value,
                status: 0
            }).then(res => { setChange(true) });
        }
    };

    useEffect(() => {
        if (change) {
            if (videoInfo && videoInfo.id) {
                axios.get('/api/comment/getvideocomment', {
                    params: {
                        videoId: videoInfo.id
                    }
                }).then(res => { setListComment(res.data); setChange(false); });
            }
        }
    }, [change, videoInfo]);

    const render = () => {
        if (listComment != null && listComment.length > 0) {
            return listComment.map((cmt, index) => (
                <VideoComment props={cmt} key={index} />
            ));
        } else {
            return <p>video này không có bình luận nào</p>;
        }
    };

    return (
        <div className={cx("comment-zone")}>
            <div className={cx("top-housing")}>
                <p>{videoInfo ? videoInfo.comment : 0} bình luận</p>
                <div>
                    <FilterOutlined />
                    sắp xếp theo
                </div>
            </div>
            <div className={cx('middle-housing')}>
                <img src="" alt="" />
                <div className={cx('response-box')}>
                    <input value={value} onChange={e => setValue(e.target.value)} className={cx('response-input')} />
                    <div>
                        <RightOutlined onClick={() => { handleCreateComment() }} />
                    </div>
                </div>
            </div>
            <div className={cx("bottom-housing")}>
                {render()}
            </div>
        </div>
    );
};


const Tab = ({ videoInfo, session }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const ViewTab = () => {
        if (selectedTab == 0) {
            return <CommentZone videoInfo={videoInfo} session={session} />
        } else if (selectedTab == 1) {
            return <ListSidebarBox />
        } else {
            return <></>
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
        <>
            <div className={cx('selection')}>
                {btn.map((b, index) => {
                    return (
                        <button key={index} className={
                            clsx({ [cx('tab-button')]: (selectedTab !== index) }, { [cx('selected-tab-button')]: (selectedTab === index) })
                        } onClick={() => { setSelectedTab(index) }}>{b.title}</button>
                    )
                })}
            </div>
            <div className={cx('selection-render')}>
                {ViewTab()}
            </div>
        </>
    )
}

const SidebarVideoItem = (props) => {
    const [img, setImg] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const videoThumbnailRef = ref(storage, `/video/thumbnails/${props.link}`)
        getDownloadURL(videoThumbnailRef).then(url => setImg(url))
    }, []);

    return (
        <div
            className={cx("items")}
            onClick={() => {
                router.push(`/watch/${props.link}`);
            }}
        >
            <img className={cx("thumbnail")} src={img} />
            <div>
                <div className={cx("video-title")}>{props.title}</div>
                <div className={cx("video-owner")}>{props.channelName}</div>
            </div>
        </div>
    );
};

const ListSidebarBox = () => {
    const [openListBox, setOpenListBox] = useState(true);
    const [listVideo, setListVideo] = useState(null);

    useEffect(() => {
        axios.get("/api/video/all").then((res) => {
            setListVideo(res.data);
        });
    }, []);

    return (
        <div className={cx("box")}>
            <div
                className={cx("top-housing")}
                onClick={() => setOpenListBox(!openListBox)}
            >
                <div className={cx("top-left")}>
                    <h4>danh sách phát kết hợp</h4>
                </div>
                <div className={cx("top-right")}>
                    <button>
                        <CloseOutlined onClick={() => setOpenListBox(false)} />
                    </button>
                </div>
            </div>
            {listVideo != null ? (
                <div
                    className={clsx(
                        { [cx("bot-housing")]: openListBox },
                        { [cx("none")]: !openListBox }
                    )}
                >
                    {listVideo.map((video, index) => {
                        return (
                            <SidebarVideoItem
                                key={index}
                                name={video.title}
                                title={video.title}
                                videoId={video.videoId}
                                channelName={video.name}
                                link={video.link}
                            />
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

function Watch({ params }) {
    const context = useContext(Context);
    const router = useRouter();
    useLayoutEffect(() => {
        context.setCollapseSidebar(false);
    }, []);

    const slug = params.link;
    const playerRef = useRef(null);
    const play = null;
    const [volume, setVolume] = useState(1);
    const [cc, setCC] = useState(false);
    const [subcribe, setSubcribe] = useState(false);
    const [collapseDescription, setCollapseDescription] = useState(false);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [videoInfo, setVideoInfo] = useState({});
    const [channelData, setChannelData] = useState({});
    const [channelAva, setChannelAva] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [triggerView, setTriggerView] = useState(false);

    useLayoutEffect(() => {
        axios.get(`/api/channel/find`, {
            params: {
                link: slug
            }
        }).then((res) => {
            setChannelData(res.data);
            const videoThumbnailRef = ref(storage, `/channel/avatars/${res.data.tagName}`)
            getDownloadURL(videoThumbnailRef).then(url => setChannelAva(url))
        });
        axios.get(`/api/video/info/${slug}`).then((res) => {
            setVideoInfo(res.data);
        });
    }, []);

    useEffect(() => {
        const videoStorageRef = ref(storage, `/video/videos/${slug}`)
        getDownloadURL(videoStorageRef).then(url => setVideoFile(url))
    }, [])

    useEffect(() => {
        if (context.ses) {
            if (context.ses.user) {
                if (channelData.id) {
                    axios.get('/api/subcribe/issubcribed', {
                        params: {
                            accountId: context.ses.user.id,
                            targetChannel: channelData.id
                        }
                    }).then(res => {
                        if (res.data != null) {
                            setSubcribe(true);
                        } else {
                            setSubcribe(false);
                        }
                    })
                }
            }
        }
    }, [channelData])

    useLayoutEffect(() => {
        if (context.ses) {
            if (videoInfo.id) {
                const x = async () => {
                    const val = await axios.get('/api/like/find', {
                        params: {
                            accountId: context.ses.user.id,
                            targetId: videoInfo.id
                        }
                    })
                    if (val.data.type == null) {
                        setLike(false)
                        setDislike(false)
                    } else {
                        if (val.data.type == 0) {
                            setLike(true)
                            setDislike(false)
                        } else {
                            setLike(false)
                            setDislike(true)
                        }
                        setLikeCount(val.data.count)
                    }
                }
                x();
            }
        }
    }, [context.ses])

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === "Space" && e.target.tagName !== "INPUT") {
                e.preventDefault();
                e.target.value += " ";
                const video = playerRef.current;
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        };

        document.addEventListener("keydown", handleSpacebar);

        return () => {
            document.removeEventListener("keydown", handleSpacebar);
        };
    }, []);

    useEffect(() => {
        const videoElement = playerRef.current;

        const handleTimeUpdate = () => {
            const { currentTime, duration } = videoElement;
            const seventyFivePercent = duration * 0.75;
            if (currentTime >= seventyFivePercent && (triggerView == false)) {
                setTriggerView(true)
                axios.post('/api/video/increaseview', {
                    videoId: videoInfo.id,
                    link: videoInfo.link
                })
            }
        }
        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [videoDuration, triggerView])

    const handleLike = () => {
        if (context.ses) {
            if (like) {
                setLike(false);
                setDislike(false);
                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                }).then(res => { setLikeCount(res.data.count) })
            } else {
                setLike(true);
                setDislike(false);
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 0
                }).then(res => { setLikeCount(res.data.count) })
            }
        }
    };
    const handleDislike = () => {

        if (context.ses) {
            setDislike(!dislike);
            setLike(false);
            if (dislike) {
                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                }).then(res => { setLikeCount(res.data.count) })
            } else {
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 1
                }).then(res => { setLikeCount(res.data.count) })
            }
        }
    };



    const volumex = () => {
        if (volume > 0.5) {
            return <MessageOutlined />;
        } else if (volume > 0) {
            return <MehOutlined />;
        } else {
            return <LockOutlined />;
        }
    };

    const playPauseController = () => {
        if (playerRef.current) {
            playerRef.current.paused ? (
                <CaretRightOutlined
                    onClick={() => {
                        if (playerRef) {
                            playerRef.current.play();
                        }
                    }}
                />
            ) : (
                <PauseOutlined
                    onClick={() => {
                        if (playerRef) {
                            playerRef.current.pause();
                        }
                    }}
                />
            );
        }
    };

    const handleSubcribe = () => {
        if (context.ses) {
            if (context.ses.user) {
                if (subcribe) {
                    setSubcribe(false);
                    axios.post('/api/subcribe/delete', {
                        accountId: context.ses.user.id,
                        targetChannel: channelData.id
                    }, {
                        headers: {
                            'accessToken': context.ses.accessToken
                        }
                    })
                } else {
                    setSubcribe(true);
                    axios.post('/api/subcribe/add', {
                        accountId: context.ses.user.id,
                        targetChannel: channelData.id
                    }, {
                        headers: {
                            'accessToken': context.ses.accessToken
                        }
                    })
                }
            }
        }

    }

    const Main = () => {
        const [deviceType, setDeviceType] = useState(0);

        useEffect(() => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth > 1100) {
                    setDeviceType(0)
                } else {
                    setDeviceType(1)
                }
            }
        }, [])

        const handleShowSubcribeButton = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 500) {
                    return !subcribe ? (
                        <button className={cx("subcribe-button")} onClick={() => { handleSubcribe() }}></button>
                    ) : (
                        <button className={cx("unsubcribe-button")} onClick={() => { handleSubcribe(); }}></button>
                    )
                } else {
                    return
                }
            }
        }

        const VideoOptionRender = () => {
            if (typeof window !== "undefined") {
                if (window.innerWidth < 500) {
                    return <></>
                } else {
                    return (
                        <>
                            <button className={cx('share-button')}>
                                <ShareAltOutlined />
                                <p>Share</p>
                            </button>
                            <div>
                                <div className={cx("like-box")} onClick={() => { handleLike() }}>
                                    {like ? <LikeFilled /> : <LikeOutlined />}
                                    <p className={cx("like-count")}>{likeCount}</p>
                                </div>
                                <div className={cx("dislike-box")} onClick={() => { handleDislike() }}>
                                    {dislike ? <DislikeFilled /> : <DislikeOutlined />}
                                </div>
                            </div>
                        </>
                    )
                }
            }
        }


        const handleLoadedMetadata = () => {
            const { duration } = playerRef.current;
            setVideoDuration(duration);
        };

        const deviceTypeLayoutPanel1 = () => {
            return (
                <div className={cx("video-box")}>
                    <div className={cx("frame-box")}>
                        <video
                            className={cx("video-player")}
                            src={videoFile}
                            allowFullScreen
                            autoPlay
                            controls
                            onLoadedMetadata={handleLoadedMetadata}
                            ref={playerRef}
                        ></video>
                        {/* <div className={cx("timeline")}></div>
                                <div className={cx("control")}>
                                    <div className={cx("left-control")}>
                                        {playPauseController()}
                                        <StepForwardOutlined />
                                        <>
                                            {volumex()}
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                className={cx("volume-controller")}
                                                onChange={(e) => {
                                                    setVolume(e.target.value);
                                                }}
                                                defaultValue="1"
                                            />
                                        </>
                                    </div>
                                    <div className={cx("right-control")}>
                                        {cc ? <IeOutlined /> : <IeOutlined />}
                                        <SettingOutlined />
                                    </div>
                                </div> */}
                    </div>
                </div>
            )
        }

        const deviceTypeLayoutPanel2 = () => {
            return (
                <>
                    <div className={cx("infomation-box")}>
                        <p className={cx("title")}>{videoInfo ? videoInfo.title : ""}</p>
                        <div>
                            <div className={cx("left-housing")}>
                                <img
                                    className={cx("avatar")}
                                    src={channelAva}
                                    onClick={() => { router.push(`/channel/${channelData.tagName}`) }}
                                ></img>
                                <div>
                                    <div>
                                        <p className={cx("channel-name")}>{channelData.name}</p>
                                    </div>
                                    <div>
                                        <p className={cx("channel-info")}>{channelData.sub} lượt đăng ký</p>
                                    </div>
                                </div>
                                {!subcribe ? (
                                    <button className={cx("subcribe-button")} onClick={() => { handleSubcribe() }}>
                                        đăng ký
                                    </button>
                                ) : (
                                    <button
                                        className={cx("unsubcribe-button")}
                                        onClick={() => { handleSubcribe(); }}
                                    >
                                        đã đăng ký
                                    </button>
                                )}
                            </div>

                            <div className={cx("right-housing")}>
                                {VideoOptionRender()}
                                <button>
                                    <EllipsisOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx({ [cx("description-box-collapse")]: collapseDescription }, { [cx("description-box-expand")]: !collapseDescription })}>
                        <p>{typeof videoInfo.view !== 'undefined' ? `${videoInfo.view} lượt xem` : ''}</p>
                        <p
                            className={cx("handle-collapse-expand-button")}
                            onClick={() => {
                                setCollapseDescription(!collapseDescription);
                            }}
                        >
                            {collapseDescription ? "Hiện thêm" : "Ẩn bớt"}
                        </p>
                    </div>
                </>
            )
        }

        return (
            <>
                {deviceType == 0 ? <>
                    <div className={cx("left-housing")}>
                        {deviceTypeLayoutPanel1()}
                        <div className={cx("below-box")}>
                            {deviceTypeLayoutPanel2()}
                            <CommentZone videoInfo={videoInfo} session={context.ses} />
                        </div>
                    </div>
                    <div className={cx("right-housing")}>
                        <ListSidebarBox />
                    </div>
                </> : <>
                    {deviceTypeLayoutPanel1()}
                    <div className={cx('below-side')}>
                        {deviceTypeLayoutPanel2()}
                        <Tab videoInfo={videoInfo} session={context.ses} />
                    </div>
                </>}
            </>
        )
    }

    return (
        <main className={cx("window")}>
            {Main()}
        </main>
    );
}

export default Watch;