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
          { [cx("sidebar-collapse")]: context.collapseSidebar },
          { [cx("sidebar-expand")]: !context.collapseSidebar }
        )}
      >
        <Sidebar />
      </aside>
      <aside
        className={clsx(
          { [cx("main-content-expand")]: context.collapseSidebar },
          { [cx("main-content-collapse")]: !context.collapseSidebar }
        )}
      >
        {children}
      </aside>
    </div>
  );
};
