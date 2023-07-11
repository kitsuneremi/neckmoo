import classNames from "classnames/bind"
import styles from '@/styles/channel/feature.module.scss'
import Video from "./Video"

const cx = classNames.bind(styles)

async function findVideoByChannel(tagName) {
    const baseUrl = process.env.VERCEL ? 'https://erinsaiyukii.com' : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/video/bychannel?tagName=${tagName}`)
    return res.json()
}

export default async function Feature({ tagName }) {

    const [listVideo] = await Promise.all([findVideoByChannel(tagName)])

    return (
        <div className={cx('box')}>
            <div className={cx('play-all-box')}>
                <p className={cx('list-title')}>Video</p>
                <button className={cx('play-button')}>phát tất cả</button>
            </div>
            <div className={cx('video-slider')}>
                {listVideo.map((video, index) => {
                    return (
                        <Video video={video} key={index} />
                    )
                })}
            </div>
        </div>

    )
}