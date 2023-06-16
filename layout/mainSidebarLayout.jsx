"use client";
import Sidebar from "@/components/DefaultSidebar";
import styles from "@/styles/home.module.scss";
import classNames from "classnames/bind";
import { useEffect, useContext } from "react";
import Context from "@/GlobalVariableProvider/Context";
import clsx from "clsx";
const cx = classNames.bind(styles);
export default ({ children }) => {
  const context = useContext(Context);
  useEffect(() => {
    context.setCollapseSidebar(false);
  }, []);

  return (
    <div className={cx("box")}>
      <aside
        className={clsx(
          { [cx("sidebar-collapse")]: context.collapseSidebar && context.deviceType == 0 },
          { [cx("sidebar-expand")]: !context.collapseSidebar && (context.deviceType == 0 || context.deviceType == 1) },
          { [cx("sidebar-hide")]: context.collapseSidebar && (context.deviceType == 1 || context.deviceType == 2) },
          { [cx("sidebar-override")]: !context.collapseSidebar && context.deviceType == 2 }
        )}
      >
        <Sidebar />
      </aside>
      <aside
        className={clsx(
          { [cx("main-content-expand")]: context.collapseSidebar && context.deviceType == 0 },
          { [cx("main-content-collapse")]: !context.collapseSidebar && (context.deviceType == 0 || context.deviceType == 1) },
          { [cx("main-content-full")]: context.collapseSidebar && context.deviceType == 1 },
          { [cx("main-content-full")]: context.deviceType == 2 },
        )}
      >
        {children}
      </aside>
    </div>
  );
};
