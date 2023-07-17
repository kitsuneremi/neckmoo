"use client";
import style from "@/styles/layout/defaultLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/components/layout/Sidebar";
import clsx from "clsx";
import { useAppSelector } from "@/redux/storage";

const cx = classNames.bind(style);

export default function ExpandCollapseLayout({ children }) {

    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
    return (
        <div className={cx("box")}>
            <aside
                className={clsx(
                    { [cx("sidebar-collapse")]: !sidebar },
                    { [cx("sidebar-expand")]: sidebar }
                )}
            >
                <Sidebar />
            </aside>
            <aside
                className={clsx(
                    { [cx("main-content-expand")]: !sidebar },
                    { [cx("main-content-collapse")]: sidebar }
                )}
            >
                {children}
            </aside>
        </div>
    )
}