'use client'
import { useContext, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import styles from "@/styles/layout/defaultLayout.module.scss";
import classNames from "classnames/bind";
import Context from "@/GlobalVariableProvider/Context";
import clsx from "clsx";
import MainLayout from '@/layout/mainLayout'

export default function WatchLayout({ children }) {
  const context = useContext(Context);
  const cx = classNames.bind(styles);
  useEffect(() => {
    context.setCollapseSidebar(true);
  }, []);
  return (
    <MainLayout>
      <div className={cx("box")}>
        <aside
          className={clsx(
            { [cx("sidebar-hide")]: context.collapseSidebar },
            { [cx("sidebar-expand")]: !context.collapseSidebar }
          )}
        >
          <Sidebar />
        </aside>
        <aside className={cx("main-content-full")}>{children}</aside>
      </div>
    </MainLayout>
  );
}
