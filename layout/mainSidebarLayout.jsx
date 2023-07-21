"use client";
import Sidebar from "@/components/layout/Sidebar";
import styles from "@/styles/home/home.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";
import { AppDispatch, useAppSelector } from '@/redux/storage'
import { useMediaQuery } from 'usehooks-ts'
import { useEffect } from "react";

const cx = classNames.bind(styles);
export default ({ children }) => {
  const deviceType = {
    isPc: useMediaQuery('(min-width: 1200px'),
    isTablet: useMediaQuery('(min-width:700px) and (max-width: 1200px)'),
    isMobile: useMediaQuery('(max-width: 700px)')
  }

  const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
  return (
    <div className={cx("box")}>
      <aside
        className={clsx(
          // sidebar thu nhỏ cho pc 
          { [cx("sidebar-collapse")]: !sidebar && deviceType.isPc },
          // sidebar mở rộng cho pc + tablet
          { [cx("sidebar-expand")]: sidebar && (deviceType.isPc || deviceType.isTablet) },
          // sidebar ẩn cho mobile + tablet 
          { [cx("sidebar-hide")]: !sidebar && (deviceType.isTablet || deviceType.isMobile) },
          // sidebar dạng ghi đè cho mobile 
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
