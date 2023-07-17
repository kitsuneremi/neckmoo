"use client";
import Sidebar from "@/components/layout/StudioSidebar";
import styles from "@/styles/home/home.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";
import { AppDispatch, useAppSelector } from '@/redux/storage'
import { useMediaQuery } from 'usehooks-ts'


const cx = classNames.bind(styles);
export default ({ children }) => {
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }

    return (
        <div className={cx("box")}>
            <aside
                className={clsx(
                    { [cx("sidebar-collapse")]: !sidebar && deviceType.isPc },
                    { [cx("sidebar-expand")]: sidebar && (deviceType.isPc || deviceType.isTablet) },
                    { [cx("sidebar-hide")]: !sidebar && (deviceType.isTablet || deviceType.isMobile) },
                    { [cx("sidebar-override")]: sidebar && deviceType.isMobile }
                )}
            >
                <Sidebar />
            </aside>
            <aside
                className={clsx(
                    { [cx("main-content-expand")]: !sidebar && deviceType.isPc },
                    { [cx("main-content-collapse")]: sidebar && (deviceType.isPc || deviceType.isTablet) },
                    { [cx("main-content-full")]: !sidebar && deviceType.isTablet },
                    { [cx("main-content-full")]: deviceType.isMobile },
                )}
            >
                {children}
            </aside>
        </div>
    );
};
