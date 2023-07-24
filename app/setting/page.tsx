'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/setting/setting.module.scss'
import classNames from 'classnames/bind'
import Setting from '@/components/setting/Settingpage'
import SettingLayout from '@/layout/SettingLayout'
import { useMediaQuery } from 'usehooks-ts'
import { LoadingOutlined } from '@ant-design/icons'
import Link from 'next/link'
//this component work only for mobile devices, pc devices will be redirect to /... page instead


const cx = classNames.bind(styles)

type listSettingType = {
    name: string,
    des: string,
    child: React.ReactNode | null
}

type sidebarSettingType = {
    name: string,
    href: string,
    icon: React.ReactNode
}

const AccountBox: React.FC = ({ }) => {
    return (
        <>
            <div className={cx('with-checkbox')}>
                <div>
                    <p>...</p>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
        </>
    )
}

const PlaybackBox: React.FC = ({ }) => {
    return (
        <>
            <div className={cx('with-checkbox')}>
                <div>
                    <p>Chế độ hạn chế</p>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
            <div className={cx('with-checkbox')}>
                <div>
                    <p>Đoạn xem trước video</p>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
            <div className={cx('without-checkbox')}>
                <p>Ngôn ngữ</p>
                <p>phát triển sau</p>
            </div>
            <div className={cx('without-checkbox')}>
                <p>Vị trí</p>
                <p>phát triển sau</p>
            </div>
            <div className={cx('without-checkbox')}>
                <p>Giao diện</p>
                <p>phát triển sau</p>
            </div>
        </>
    )
}

const listSetting: listSettingType[] = [
    {
        name: 'Tài khoản',
        des: 'Cài đặt tài khoản',
        child: <AccountBox />
    },
    {
        name: 'Video đã xem và quyền riêng tư',
        des: 'Quản lý nhật ký và lịch sử tìm kiếm',
        child: <PlaybackBox />
    },
    {
        name: 'Thông báo',
        des: 'Chọn các thông báo sẽ được gửi qua email',
        child: null
    }

]





const sidebarSettings: sidebarSettingType[] = [
    {
        name: 'Tài khoản',
        href: '/setting/account',
        icon: <LoadingOutlined />
    },
    {
        name: 'Thông báo',
        href: '/setting/notification',
        icon: <LoadingOutlined />
    },
    {
        name: 'Chức năng phát và hiệu suất',
        href: '/setting/playback',
        icon: <LoadingOutlined />
    },
    {
        name: 'Nội dung tải xuống',
        href: 'setting/download',
        icon: <LoadingOutlined />
    },
    {
        name: 'Quyền riêng tư',
        href: '/setting/privacy',
        icon: <LoadingOutlined />
    },
    {
        name: 'Cài đật nâng cao',
        href: '/setting/advance',
        icon: <LoadingOutlined />
    }
]



export default function Account() {
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px')
    }
    const router = useRouter()

    useEffect(() => {
        if (deviceType.isPc) {
            router.push('/setting/account')
        }
    }, [])

    return (
        <SettingLayout>
            <main className={cx('box')}>
                {listSetting.map((s, index) => {
                        return (
                            <Setting key={index} setting={s} />
                        )
                    })}
            </main>
        </SettingLayout>
    )
}



