'use client'
import { useRouter } from 'next/navigation'
//component
import Sidebar from "@/components/layout/Sidebar";
//style
import clsx from "clsx";
import classNames from 'classnames/bind'
import pagestyles from '@/styles/setting/setting.module.scss'
import layoutstyles from "@/styles/layout/defaultLayout.module.scss";
//?
import Link from "next/link";
import { useAppSelector } from '@/redux/storage';
import { useMediaQuery } from 'usehooks-ts'


const settingTabClassName = classNames.bind(pagestyles)
const layoutCx = classNames.bind(layoutstyles);


const props = [
    {
        name: 'Tài khoản',
        href: 'account'
    },
    {
        name: 'Thông báo',
        href: 'notification'
    },
    {
        name: 'Chức năng phát và hiệu suất',
        href: 'playback'
    },
    {
        name: 'Nội dung tải xuống',
        href: 'download'
    },
    {
        name: 'Quyền riêng tư',
        href: 'privacy'
    },
    {
        name: 'Cài đật nâng cao',
        href: 'advance'
    }
]

export default function SettingLayout({ children }) {
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)


    // ý tưởng ở đây là giao diện mobile sẽ cho hiển thị sidebar bình thường để có thể redirect sang trang home các thứ
    const pclayout = () => {
        if (deviceType.isPc == 0) {
            return (
                <div>
                    {props.map((prop, index) => {
                        return (
                            <div key={index} className={settingTabClassName('side-menu-item')}>
                                <Link href={`/setting/${prop.href}`}>
                                    <p>{prop.name}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return (
        <div className={layoutCx("box")}>
            <aside
                className={clsx(
                    { [layoutCx("sidebar-hide")]: !sidebar },
                    { [layoutCx("sidebar-expand")]: sidebar }
                )}
            >
                <Sidebar />
            </aside>
            <aside className={layoutCx("main-content-full")} style={{ display: 'flex' }}>
                {pclayout()}
                {children}
            </aside>
        </div>
    )
}