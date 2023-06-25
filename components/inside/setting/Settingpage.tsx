'use client'
import styles from '@/styles//setting.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'


const cx = classNames.bind(styles)


type setting = {
    name: string,
    des: string,
    child?: React.ReactElement
}

type settingprops = {
    key: number | string,
    setting: setting
}

const Setting: React.FC<settingprops> = (props) => {

    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className={cx('setting-parent-box')}>
            <div className={cx('top-side')} onClick={() => { setOpen(!open) }}>
                <div>
                    <h3>{props.setting.name}</h3>
                    <p>{props.setting.des}</p>
                </div>
                <div className={cx('drop-button-box')}>
                    {!open && <DownOutlined className={cx('button')} />}
                    {open && <UpOutlined className={cx('button')} />}
                </div>
            </div>
            {
                open && <div className={cx('bottom-side')}>
                    {props.setting.child ? props.setting.child : <></>}
                </div>
            }
        </div>
    )
}

export default Setting