"use client";
import {
    useState,
    useEffect,
    useRef,
    useContext,
    useLayoutEffect,
} from "react";
import {
    CaretRightOutlined,
    PauseOutlined,
    StepForwardOutlined,
    CloseOutlined,
    LikeFilled,
    DislikeFilled,
    ShareAltOutlined,
    EllipsisOutlined,
    DislikeOutlined,
    LikeOutlined,
    FilterOutlined,
    QuestionOutlined,
    MehOutlined,
    LockOutlined,
    IeOutlined,
    MessageOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Link } from "next/link";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/watch.module.scss";
import clsx from "clsx";
import axios from "axios";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import VideoComment from '@/components/inside/VideoComment';
import VideoCommentInput from '@/components/inside/VideoCommentInput';

const cx = classNames.bind(style);

const SidebarVideoItem = (props) => {
    const [img, setImg] = useState(null);
    const router = useRouter();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/fileout/videoimage/${props.link}`, {
                responseType: "blob",
            })
            .then((res) => {
                var binaryData = [];
                binaryData.push(res.data);
                setImg(
                    window.URL.createObjectURL(
                        new Blob(binaryData, { type: "image/jpeg" })
                    )
                );
            });
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
                                channelName={video.channelName}
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
    const [commentFocused, setCommentFocused] = useState(false);

    const [videoInfo, setVideoInfo] = useState({});
    const [channelData, setChannelData] = useState({});
    const [channelAva, setChannelAva] = useState(null);

    useLayoutEffect(() => {
        axios.get(`/api/channel/find`, {
            params: {
                link: slug
            }
        }).then((res) => {
            setChannelData(res.data);
            axios.get(
                `http://localhost:5000/api/fileout/channelavatar/${res.data.tagName}`, {
                responseType: "blob",
            }
            ).then(r => {
                const filedata = r.data;
                var binaryData = [];
                binaryData.push(filedata);
                setChannelAva(
                    URL.createObjectURL(
                        new Blob(binaryData, { type: "image/jpeg" })
                    )
                );
            })
        });
        axios.get(`/api/video/info/${slug}`).then((res) => {
            setVideoInfo(res.data);
        });
    }, []);

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
        if(context.ses){
            if(videoInfo.id){
                const x = async () => {
                    const val = await axios.get('/api/like/find',{
                        params: {
                            accountId: context.ses.user.id,
                            targetId: videoInfo.id
                        }
                    })
                    if(val.data == null){
                        setLike(false)
                        setDislike(false)
                    }else{
                        if(val.data.type == 0){
                            setLike(true)
                            setDislike(false)
                        }else{
                            setLike(false)
                            setDislike(true)
                        }
                    }
                }
                x();
            }
        }
    },[context.ses]) 

    const handleLike = () => {
        if (context.ses) {
            if (like) {
                setLike(false);
                setDislike(false);
                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                })
            } else {
                setLike(true);
                setDislike(false);
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 0
                })
            }
        }
    };
    const handleDislike = () => {
        if (context.ses) {
            if (dislike) {
                setLike(false);
                setDislike(false);

                axios.post('/api/like/delete', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                })
            } else {
                setLike(false);
                setDislike(true);
                axios.post('/api/like/add', {
                    accountId: context.ses.user.id,
                    targetId: videoInfo.id,
                    type: 1
                })
            }
        }
    };

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

    return (
        <main className={cx("window")}>
            <div className={cx("left-housing")}>
                <div className={cx("video-box")}>
                    <div className={cx("frame-box")}>
                        <video
                            className={cx("video-player")}
                            src={`http://localhost:5000/api/fileout/video/${slug}`}
                            allowFullScreen
                            autoPlay
                            ref={playerRef}
                        ></video>
                        <div className={cx("timeline")}></div>
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
                        </div>
                    </div>
                </div>
                <div className={cx("below-box")}>
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
                                        <p className={cx("channel-info")}>1Tr lượt đăng ký</p>
                                    </div>
                                </div>
                                {!subcribe ? (
                                    <button
                                        className={cx("subcribe-button")}
                                        onClick={() => { handleSubcribe(); }}
                                    >
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
                                <div>
                                    <div
                                        className={cx("like-box")}
                                        onClick={() => {
                                            handleLike();
                                        }}
                                    >
                                        {like ? <LikeFilled /> : <LikeOutlined />}
                                        <p className={cx("like-count")}>100N</p>
                                    </div>
                                    <div
                                        className={cx("dislike-box")}
                                        onClick={() => {
                                            handleDislike();
                                        }}
                                    >
                                        {dislike ? <DislikeFilled /> : <DislikeOutlined />}
                                    </div>
                                </div>
                                <button>
                                    <ShareAltOutlined />
                                    Share
                                </button>
                                <button>
                                    <EllipsisOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            { [cx("description-box-collapse")]: collapseDescription },
                            { [cx("description-box-expand")]: !collapseDescription }
                        )}
                    >
                        <p
                            className={cx("handle-collapse-expand-button")}
                            onClick={() => {
                                setCollapseDescription(!collapseDescription);
                            }}
                        >
                            {collapseDescription ? "Hiện thêm" : "Ẩn bớt"}
                        </p>
                    </div>
                    <div className={cx("comment-zone")}>
                        <div className={cx("top-housing")}>
                            <p>???</p>
                            <div>
                                <FilterOutlined />
                                sắp xếp theo
                            </div>
                        </div>
                        <div className={cx("middle-housing")}>
                            <img src="" className={cx("avatar")}></img>
                            <div>
                                <input
                                    onFocus={() => {
                                        setCommentFocused(true);
                                    }}
                                    onBlur={() => {
                                        setCommentFocused(false);
                                    }}
                                    placeholder="viết bình luận"
                                ></input>
                                {commentFocused ? (
                                    <div className={cx("input-plugin-box")}>
                                        <QuestionOutlined />
                                        <div>
                                            <button>hủy</button>
                                            <button>bình luận</button>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className={cx("bottom-housing")}>
                            <VideoComment />
                            <VideoCommentInput />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("right-housing")}>
                <ListSidebarBox />
            </div>
        </main>
    );
}

export default Watch;
