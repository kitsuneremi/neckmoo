import { CloseOutlined } from "@ant-design/icons";
import Item from "../inside/ListSideBarItem";
import { memo, useState, useEffect } from 'react'
import style from '../../styles/VideoListSidebarBox.module.scss'
import axios from "axios";
import clsx from "clsx";
import classNames from 'classnames/bind'

function WatchVideoListSidebarBox() {
    const cx = classNames.bind(style)
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
            {/* {listVideo != null ? <div className={clsx({ [cx('bot-housing')]: openListBox }, { [cx('none')]: !openListBox })}>
                {
                    listVideo.map((video, index) => {
                        return <Item key={index} name={video.title} title={video.title} videoId={video.videoId} channelName={video.channelName} link={video.link} />
                    })
                }
            </div> : <></>
            } */}
        </div>
    )
}
export default memo(WatchVideoListSidebarBox)