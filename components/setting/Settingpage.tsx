'use client'
import styles from '@/styles/setting/setting.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'


const cx = classNames.bind(styles)


type setting = {
    name: string,
    des: string,
    child: React.ReactNode | null
}

type settingprops = {
    key: number | string,
    setting: setting
}

const Setting: React.FC<settingprops> = (props) => {

    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className={cx('setting-item')}>
            <div className={cx('top')} onClick={() => { setOpen(!open) }}>
                <div>
                    <p className={cx('title')}>{props.setting.name}</p>
                    <p className={cx('des')}>{props.setting.des}</p>
                </div>
                <div className={cx('drop-button-box')}>
                    {open ? <UpOutlined className={cx('button')} /> : <DownOutlined className={cx('button')} />}
                </div>
            </div>
            {
                open && <div className={cx('bottom')}>
                    {props.setting.child ? props.setting.child : <></>}
                </div>
            }
        </div>
    )
}

export default Setting