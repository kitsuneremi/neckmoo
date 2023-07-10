'use client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Context from '@/GlobalVariableProvider/Context'
import styles from '@/styles/setting/setting.module.scss'
import classNames from 'classnames/bind'
import Setting from '@/components/setting/Settingpage'
import SettingLayout from '@/components/layout/SettingLayout'


//this component work only for mobile devices, pc devices will be redirect to /... page instead


const cx = classNames.bind(styles)

const AccountBox = () => {
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

const PlaybackBox = () => {
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

const listSetting = [
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
        des: 'Chọn các thông báo sẽ được gửi qua email'
    },
    {
        name: 'Carymei',
        des: 'dự án cá nhân của sinh viên năm 2 trường F'
    }

]




export default function Account() {
    const context = useContext(Context)
    const router = useRouter()

    useEffect(() => {
        if (context.deviceType == 0) {
            router.push('/setting/account')
        }
    }, [])

    const render = () => {
        return listSetting.map((s, index) => {
            return (
                <Setting key={index} setting={s} />
            )
        })
    }
    return (
        <SettingLayout>
            <div className={cx('box')}>
                {render()}
            </div>
        </SettingLayout>
    )
}