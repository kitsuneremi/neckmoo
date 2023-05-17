'use client'
import styles from '@/styles/home.module.scss'
import classNames from 'classnames/bind'
import { memo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from "axios"

// export async function getServerSideProps(context) {
//     try {
//         const {link} = context.query
//         console.log(link)
//         const [imageData] = await Promise.all(axios.get(`http://localhost:5000/api/fileout/image/${link}`, { responseType: 'blob' }))
//         let binaryData = [imageData.data]
//         return {
//             props: {
//                 binaryData
//             }
//         }
//     } catch (error) {
//         return {
//             props:{
//                 error
//             }
//         }
//     }

// }

function HomeVideoItem(props) {
    const router = useRouter()
    const cx = classNames.bind(styles)
    // const img = URL.createObjectURL(new Blob(props.binaryData, { type: "image/jpeg" }))
    const [img, setImg] = useState(null)

    useEffect(() => {
        props.link && axios.get(`http://localhost:5000/api/fileout/image/${props.link}`, { responseType: 'blob' })
            .then(res => {
                var binaryData = [];
                binaryData.push(res.data);
                setImg(window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" })));
            })
    }, [])

    return (
        <div className={cx('box')} onClick={() => {router.push(`/watch/${props.link}`)}}>
            <img className={cx('thumbnail')} src={img}></img>
            <div>
                <img className={cx('icon')}
                    src={``}
                ></img>
                <div>
                    <div>
                        <p className={cx('title')}>{props.name || 'abc'}</p>
                    </div>
                    <div>
                        <p className={cx('video-details')} onClick={() => { router.push('/') }}>{props.channelName || 'asdasdasda'}</p></div>
                    <div>
                        <p className={cx('video-details')}>{props.view || '1000'}</p>
                        <p className={cx('video-details')}>{props.status || '1 ngày trước'}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

// HomeVideoItem.getInitialProps = async (ctx) => {
//     return await getServerSideProps(ctx);
// }

export default memo(HomeVideoItem)