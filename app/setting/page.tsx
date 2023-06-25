'use client'
import Context from '@/GlobalVariableProvider/Context'
import styles from '@/styles//setting.module.scss'
import classNames from 'classnames/bind'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Setting from '@/components/inside/setting/Settingpage'

const cx = classNames.bind(styles)

type setting = {
    name: string,
    des: string,
    child?: React.ReactElement
}

const AccountBox: React.FC = () => {
    return (
        <>
            <div className={cx('with-checkbox')}>
                <div>
                    <h3>Chế độ hạn chế</h3>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
        </>
    )
}

const PlaybackBox: React.FC = () => {
    return (
        <>
            <div className={cx('with-checkbox')}>
                <div>
                    <h3>Chế độ hạn chế</h3>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
            <div className={cx('with-checkbox')}>
                <div>
                    <h3>Đoạn xem trước video</h3>
                    <p>phát triển sau</p>
                </div>
                <input type='checkbox' />
            </div>
            <div className={cx('without-checkbox')}>
                <h3>Ngôn ngữ</h3>
                <p>phát triển sau</p>
            </div>
            <div className={cx('without-checkbox')}>
                <h3>Vị trí</h3>
                <p>phát triển sau</p>
            </div>
            <div className={cx('without-checkbox')}>
                <h3>Giao diện</h3>
                <p>phát triển sau</p>
            </div>
        </>
    )
}

const listSetting: setting[] = [
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
    const context: any = useContext(Context)
    const router = useRouter()
    if (context.deviceType == 0) {
        router.push('/setting/account')
    }
    const render = () => {
        return listSetting.map((setting, index) => {
            return (
                <Setting key={index} setting={setting} />
            )
        })
    }
    return (
        <div className={cx('box')}>
            {render()}
        </div>
    )
}