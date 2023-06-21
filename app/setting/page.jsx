'use client'
import Context from '@/GlobalVariableProvider/Context'
import styles from '@/styles//setting.module.scss'
import classNames from 'classnames/bind'
import { useState, useLayoutEffect, useContext, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const cx = classNames.bind(styles)

const AccountBox = () => {
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

const listSetting = [
    {
        name: 'Tài khoản',
        des: 'Chọn cách bạn xuất hiện và nội dung trên carymei',
        child: <AccountBox />
    },
    {
        name: 'Video đã xem và quyền riêng ttw',
        des: 'Quản lý nhật ký và lịch sử tìm kiếm'
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

const Setting = ({ setting }) => {

    const [open, setOpen] = useState(false);
    return (
        <div className={cx('setting-parent-box')}>
            <div className={cx('top-side')} onClick={() => { setOpen(!open) }}>
                <div>
                    <h3>{setting.name}</h3>
                    <p>{setting.des}</p>
                </div>
                <div className={cx('drop-button-box')}>
                    {!open && <DownOutlined className={cx('button')} />}
                    {open && <UpOutlined className={cx('button')} />}
                </div>
            </div>
            {
                open && <div className={cx('bottom-side')}>
                    {setting.child ? setting.child : <></>}
                </div>
            }
        </div>
    )
}

const render = () => {
    return listSetting.map((setting, index) => {
        return (
            <Setting key={index} setting={setting} />
        )
    })
}

export default function Account() {
    const context = useContext(Context)
    const router = useRouter()
    if (context.deviceType == 0) {
        router.push('/setting/account')
    }
    return (
        <div className={cx('box')}>
            {render()}
        </div>
    )
}