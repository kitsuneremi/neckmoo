'use client'
//component
import Sidebar from "@/components/layout/Sidebar";
//style
import clsx from "clsx";
import classNames from 'classnames/bind'
import styles from "@/styles/layout/defaultLayout.module.scss";
import settingLayoutStyles from "@/styles/layout/settingLayout.module.scss"
//?
import Link from "next/link";
import { useAppSelector, AppDispatch } from '@/redux/storage';
import { useIsomorphicLayoutEffect, useMediaQuery } from 'usehooks-ts'
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);
const settingCx = classNames.bind(settingLayoutStyles)



export default function SettingLayout({ children }) {

    const router = useRouter()

    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)

    useIsomorphicLayoutEffect(() => {
        if (deviceType.isMobile || deviceType.isTablet) {
            router.push('/setting') 
        }else{
            router.push('/setting/account')
        }
    }, [deviceType])

    return (
        <div className={cx("box")}>
            <aside
                className={clsx(
                    { [cx("sidebar-hide")]: !sidebar },
                    { [cx("sidebar-expand")]: sidebar }
                )}
            >
                <Sidebar />
            </aside>
            <aside className={settingCx("over-box")}>
                {children}
            </aside>
        </div>
    )
}