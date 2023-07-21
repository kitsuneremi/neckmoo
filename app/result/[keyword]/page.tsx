import { Metadata } from "next"
import classNames from "classnames/bind"
import styles from '@/styles/result/result.module.scss'
import dynamic from "next/dynamic"
import Link from 'next/link'
const SubcribeButton = dynamic(() => import("@/components/watch/SubcribeButton"))
const Channel = dynamic(() => import("@/components/result/Channel"), {
    loading: () => <div>Loading...</div>,
});

const Video = dynamic(() => import("@/components/result/Video"))

export async function generateMetadata({ params }): Promise<Metadata> {
    return {
        title: `kết quả cho ${params.keyword}`,
        description: `kết quả cho ${params.keyword}`
    }
}

type videoData = {
    id: number,
    title: string,
    des: string,
    view: number,
    status: number,
    link: string,
    fragmentMode: boolean,
    channelId: number,
    createdAt: Date,
    updatedAt: Date
}

type channelData = {
    id: number,
    name: string,
    tagName: string,
    des: string,
    accountId: number,
    createdAt: Date,
    updatedAt: Date
}


type resultData = {
    channels: channelData[],
    videos: videoData[]
}




const baseUrl = process.env.VERCEL ? 'https://www.erinasaiyukii.com' : 'http://localhost:3000'

const cx = classNames.bind(styles)

export default async function Result({ params }) {
    const results: resultData = await fetch(`${baseUrl}/api/search?keyword=${params.keyword}`).then(res => res.json())

    return (
        <div className={cx('box')}>
            <div className={cx('left')}>
                {ChannelsRender(results.channels)}
                <p>{`các kết quả liên quan đến từ khóa ${params.keyword}`}</p>
                {VideosRender(results.videos)}
            </div>
            <div className={cx('right')}>
                {/* {results.channels.length > 0 && handleChannelResultSideRender({ data: results.channels })} */}
            </div>

        </div>
    )
}


function ChannelsRender(channelsData: channelData[]) {
    return channelsData.map((channel, index) => {
        return (<Channel tagName={channel.tagName} key={index} />)
    })

}

function VideosRender(videosData: videoData[]) {
    return videosData.map((video, index) => {
        return (<Video key={index} videoData={video} />)
    })
}

const handleChannelResultSideRender: React.FC = ({ data }: { data: channelData }) => {
    return (
        <>
            {/* update in future */}
            <div className={cx('target-channel-overview-box')}>
                <div className={cx('top')}>
                    <Link href={`/channel/${data.tagName}`}>

                    </Link>
                </div>
                <div className={cx('bottom')}>

                </div>
            </div>
        </>
    )
}