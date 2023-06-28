'use client'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { useRouter } from "next/navigation";
import { CloseOutlined } from "@ant-design/icons";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/watch/watch.module.scss";
import clsx from "clsx";
import axios from "axios";
import classNames from "classnames/bind";
import Properties from '@/components/watch/Properties'
import DescriptionBox from '@/components/watch/DescriptionBox'
import Comments from '@/components/watch/Comments'
import Player from '@/components/watch/Player'
const cx = classNames.bind(style);

// export async function generateMetadata({ params }) {
//     const link = params.link
//     const video = await axios.get('/api/findbylink', {
//         params: {
//             link: link
//         }
//     }).then(res => res.json())

//     return {
//         title: video.title
//     }
// }




const Tab = ({ slug }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const ViewTab = () => {
        if (selectedTab == 0) {
            return <Comments link={slug} />
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

export default function Watch({ params }) {
    const context = useContext(Context);
    useLayoutEffect(() => {
        context.setCollapseSidebar(false);
    }, []);

    const slug = params.link;

    const finalRender = () => {
        if (context.deviceType === 0) {
            return (
                <>
                    <div className={cx("left-housing")}>
                        <Player link={slug} />
                        <div className={cx("below-box")}>
                            <Properties link={slug} />
                            <DescriptionBox link={slug} />
                            <Comments link={slug} />
                        </div>
                    </div>
                    <div className={cx("right-housing")}>
                        <ListSidebarBox />
                    </div>
                </>
            )
        } else if (context.deviceType === 1 || context.deviceType === 2) {
            return (
                <>
                    <Player link={slug} />
                    <div className={cx('below-side')}>
                        <Properties link={slug} />
                        <DescriptionBox link={slug} />
                        <Tab slug={slug} />
                    </div>
                </>
            )
        }
    }

    return (
        <main className={cx("window")}>
            {finalRender()}
        </main>
    );
}