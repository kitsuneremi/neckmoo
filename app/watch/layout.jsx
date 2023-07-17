'use client'
import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import styles from "@/styles/layout/defaultLayout.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";
import MainLayout from '@/layout/mainLayout'
import { AppDispatch, useAppSelector } from '@/redux/storage';
import { useDispatch } from 'react-redux'
import { close, reverse, open } from '@/redux/features/sidebar-slice';

export default function WatchLayout({ children }) {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch()
  const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
  useEffect(() => {
    dispatch(close())
  }, []);

  return (
    <MainLayout>
      <div className={cx("box")}>
        <aside
          className={clsx(
            { [cx("sidebar-hide")]: !sidebar },
            { [cx("sidebar-expand")]: sidebar }
          )}
        >
          <Sidebar />
        </aside>
        <aside className={cx("main-content-full")}>{children}</aside>
      </div>
    </MainLayout>
  );
}
