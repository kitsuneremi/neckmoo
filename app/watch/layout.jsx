'use client'
import Sidebar from "@/components/DefaultSidebar";
import styles from "@/styles/defaultLayout.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import Context from "@/GlobalVariableProvider/Context";
import clsx from "clsx";
import MainLayout from '@/layout/mainLayout'
export const metadata = {
  title: {
    default: 'watch page',
    template: '%s - carymei'
  },
}
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
