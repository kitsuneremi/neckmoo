'use client'
import { useState, useEffect, useRef, useContext } from "react"
import { CaretRightOutlined, PauseOutlined, StepForwardOutlined, CloseOutlined, LikeFilled, DislikeFilled, ShareAltOutlined, EllipsisOutlined, DislikeOutlined, LikeOutlined, FilterOutlined, QuestionOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Context from '@/GlobalVariableProvider/Context'
import style from '@/styles/watch.module.scss';
import clsx from "clsx";
import axios from "axios";
import classNames from 'classnames/bind'

const cx = classNames.bind(style)
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

const SidebarVideoItem = () => {
    const [img, setImg] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/fileout/image/${props.link}`, { responseType: 'blob' })
            .then(res => {
                var binaryData = [];
                binaryData.push(res.data);
                setImg(window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
            })
    }, [])

    return (
        <Link href={`/watch/${props.link}`}>
            <div className={cx("items")}>
                <img className={cx("thumbnail")} src={img} />
                <div>
                    <div className={cx("video-title")}>{props.title}</div>
                    <div className={cx("video-owner")}>{props.channelName}</div>
                </div>
            </div>
        </Link>
    )
}

const ListSidebarBox = () => {
    const [openListBox, setOpenListBox] = useState(true)
    const [listVideo, setListVideo] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5000/api/video')
            .then(res => { setListVideo(res.data) })
    }, [])

    return (
        <div className={cx('box')}>
            <div className={cx('top-housing')} onClick={() => setOpenListBox(!openListBox)}>
                <div className={cx('top-left')}>
                    <h4>danh sách phát kết hợp</h4>
                </div>
                <div className={cx('top-right')}>
                    <button>
                        <CloseOutlined onClick={() => setOpenListBox(false)} />
                    </button>
                </div>
            </div>
            {listVideo != null ? <div className={clsx({ [cx('bot-housing')]: openListBox }, { [cx('none')]: !openListBox })}>
                {
                    listVideo.map((video, index) => {
                        return <SidebarVideoItem key={index} name={video.title} title={video.title} videoId={video.videoId} channelName={video.channelName} link={video.link} />
                    })
                }
            </div> : <></>
            }
        </div>
    )
}


function Watch({ params, channelData }) {
    const context = useContext(Context)
    useEffect(() => {
        context.setCollapseSidebar(false)
    }, [])

    const slug = params.link
    const playerRef = useRef(null)
    const play = null
    const [volume, setVolume] = useState(1)
    const [cc, setCC] = useState(false)
    const [subcribe, setSubcribe] = useState(false)
    const [collapseDescription, setCollapseDescription] = useState(false)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [commentFocused, setCommentFocused] = useState(false)

    const handleLike = () => {
        if (like) {
            setLike(false)
            setDislike(false)
        } else {
            setLike(true)
            setDislike(false)
        }

    }
    const handleDislike = () => {
        if (dislike) {
            setLike(false)
            setDislike(false)
        } else {
            setLike(false)
            setDislike(true)
        }

    }

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                e.target.value += ' ';
                const video = playerRef.current
                if (video.paused) {
                    video.play()
                } else {
                    video.pause()
                }
            }
        };

        document.addEventListener('keydown', handleSpacebar);

        return () => {
            document.removeEventListener('keydown', handleSpacebar);
        };
    }, []);

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

    const playPauseController = () => {
        if (playerRef.current) {
            playerRef.current.paused ? <CaretRightOutlined onClick={() => { if (playerRef) { playerRef.current.play() } }} /> : <PauseOutlined onClick={() => { if (playerRef) { playerRef.current.pause() } }} />
        }
    }
    return (
        <main className={cx('window')}>
            <div className={cx('left-housing')}>
                <div className={cx('video-box')}>
                    <div className={cx('frame-box')}>
                        <video
                            className={cx('video-player')}
                            src={`http://localhost:5000/api/fileout/video/${slug}`}
                            allowFullScreen
                            autoPlay
                            ref={playerRef}
                        ></video>
                        <div className={cx('timeline')}>

                        </div>
                        <div className={cx('control')}>
                            <div className={cx('left-control')}>
                                {
                                    playPauseController()
                                }
                                <StepForwardOutlined />
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
                                {cc ? <FontAwesomeIcon icon="fa-solid fa-closed-captioning" size="2xl" onClick={() => { setCC(false) }} /> : <FontAwesomeIcon icon="fa-regular fa-closed-captioning" size="2xl" onClick={() => { }} />}
                                <FontAwesomeIcon icon="fa-solid fa-gear" size="2xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('below-box')}>
                    <div className={cx('infomation-box')}>
                        <p className={cx('title')}>【Deemo】Lune 弾いてみた【ピアノ】</p>
                        <div>
                            <div className={cx('left-housing')}>
                                <img className={cx('avatar')}></img>
                                <div>
                                    <div><p className={cx('channel-name')}>Laur</p></div>
                                    <div><p className={cx('channel-info')}>1Tr lượt đăng ký</p></div>
                                </div>
                                {!subcribe ? <button className={cx('subcribe-button')} onClick={() => { setSubcribe(true) }}>đăng ký</button> : <button className={cx('unsubcribe-button')} onClick={() => { setSubcribe(false) }}>đã đăng ký</button>}
                            </div>
                            <div className={cx('right-housing')}>
                                <div>
                                    <div className={cx('like-box')} onClick={() => { handleLike() }}>
                                        {like ? <LikeFilled /> : <LikeOutlined />}
                                        <p className={cx('like-count')}>100N</p>
                                    </div>
                                    <div className={cx('dislike-box')} onClick={() => { handleDislike() }}>
                                        {dislike ? <DislikeFilled /> : <DislikeOutlined />}
                                    </div>
                                </div>
                                <button><ShareAltOutlined />Share</button>
                                <button><EllipsisOutlined /></button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx({ [cx('description-box-collapse')]: collapseDescription }, { [cx('description-box-expand')]: !collapseDescription })}>
                        <p className={cx('handle-collapse-expand-button')} onClick={() => { setCollapseDescription(!collapseDescription) }}>{collapseDescription ? 'Hiện thêm' : 'Ẩn bớt'}</p>
                    </div>
                    <div className={cx('comment-zone')}>
                        <div className={cx('top-housing')}>
                            <p>???</p>
                            <div>
                                <FilterOutlined />
                                sắp xếp theo
                            </div>
                        </div>
                        <div className={cx('middle-housing')}>
                            <img src="" className={cx('avatar')}></img>
                            <div>
                                <input onFocus={() => { setCommentFocused(true) }} onBlur={() => { setCommentFocused(false) }} placeholder="viết bình luận"></input>
                                {commentFocused ? <div className={cx('input-plugin-box')}>
                                    <QuestionOutlined />
                                    <div>
                                        <button>hủy</button>
                                        <button>bình luận</button>
                                    </div>
                                </div> : <></>}
                            </div>
                        </div>
                        <div className={cx('bottom-housing')}>
                            gen ra mớ comment- hạng mục sẽ được thi công sau
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('right-housing')}>
                <ListSidebarBox />
            </div>
        </main>
    )
}

export default Watch