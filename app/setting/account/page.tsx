'use client'
import Context from '@/GlobalVariableProvider/Context'
import styles from '@/styles/settingComponent.module.scss'
import classNames from 'classnames/bind'
import { useState, useLayoutEffect, useContext, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import NotiBoard from '@/components/NotificationBoard'

const cx = classNames.bind(styles)

type channelDataType = {
    tagName?: string
}

export default function AccountSetting() {
    const context: any = useContext(Context)
    const [img, setImg] = useState(null)
    const [channelData, setChannelData] = useState<channelDataType>({})
    const router = useRouter()

    useLayoutEffect(() => {

        if (context.ses != null) {
            axios.get('/api/channel/getdatabyaccountid', {
                params: {
                    accountId: context.ses.user.id
                }
            }).then(res => {
                setChannelData(res.data)
                if (res.data == null) {

                } else {
                    const avatarRef = ref(storage, `/channel/avatars/${res.data.tagName}`)
                    getDownloadURL(avatarRef).then(url => setImg(url))
                }
            })

        }
    }, [context.ses])
    useLayoutEffect(() => {
        if (context.deviceType == 2 || context.deviceType == 1) {
            router.push('/setting')
        }
    }, [context.deviceType])

    return (
        <div className={cx('box')}>
            <div></div>
            <div className={cx('main-tab')}>
                <p>Kênh của bạn</p>
                <div>
                    <div>
                        {img != null && <Image width={60} height={60} src={img} alt='loading' defaultValue={`https://pbs.twimg.com/profile_images/1561821281716142080/xdZX4AF0_400x400.jpg`} />}
                        <p>{channelData.tagName}</p>
                    </div>
                    <Link href={'/studio'}><p>Trạng thái và tính năng của kênh</p></Link>
                    <Link href={'/studio'}><p>Tạo hoặc quản lý kênh của bạn</p></Link>
                    <Link href={'/studio'}><p>Xem các cài đặt nâng cao</p></Link>
                </div>
            </div>
            <div>

            </div>
        </div>
    )


}