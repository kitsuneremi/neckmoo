'use client'
import { useState, useLayoutEffect, useEffect } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import styles from '@/styles/setting/settingComponent.module.scss'
import classNames from 'classnames/bind'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import SettingLayout from '@/layout/SettingLayout'
import { useSession } from 'next-auth/react'
import NotiBoard from '@/components/NotificationBoard'
import { Session } from 'next-auth';
import { useMediaQuery } from 'usehooks-ts'
import PcSetiingLayout from '@/layout/PcSettingLayout';

const cx = classNames.bind(styles)


export default function AccountSetting() {
    const [img, setImg] = useState(null)
    const [channelData, setChannelData] = useState({})
    const router = useRouter()
    const { data: session } = useSession()
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }
    useEffect(() => {
        if (session && session.user) {
            axios.get('/api/channel/getdatabyaccountid', {
                params: {
                    accountId: session.user.id
                }
            }).then(res => {
                setChannelData(res.data)
                if (res.data == null) {
                    setChannelData({})
                } else {
                    const avatarRef = ref(storage, `/channel/avatars/${res.data.tagName}`)
                    getDownloadURL(avatarRef).then(url => setImg(url))
                }
            })

        }
    }, [session])
    useLayoutEffect(() => {
        if (deviceType.isMobile || deviceType.isTablet) {
            router.push('/setting')
        }
    }, [deviceType])

    return (
        <SettingLayout>
            <PcSetiingLayout>
                <div className={cx('box')}>
                    <div>
                        {img != null && <Image width={60} height={60} src={img} alt='loading' />}
                        <p>{channelData.tagName}</p>
                    </div>

                    <div className={cx('redirect-box')}><Link href={'/studio'}>Trạng thái và tính năng của kênh</Link></div>
                    <div className={cx('redirect-box')}><Link href={'/studio'}>Tạo hoặc quản lý kênh của bạn</Link></div>
                    <div className={cx('redirect-box')}><Link href={'/studio'}>Xem các cài đặt nâng cao</Link></div>
                </div>
            </PcSetiingLayout>
        </SettingLayout>
    )


}