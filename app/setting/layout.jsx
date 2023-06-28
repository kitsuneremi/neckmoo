'use client'
import { useContext, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import layoutstyles from "@/styles/layout/defaultLayout.module.scss";
import pagestyles from '@/styles/setting/setting.module.scss'
import classNames from "classnames/bind";
import Context from "@/GlobalVariableProvider/Context";
import clsx from "clsx";
import MainLayout from '@/layout/mainLayout'
import Link from "next/link";
const cx = classNames.bind(layoutstyles);
const settingTabClassName = classNames.bind(pagestyles)

export default function Layout({ children }) {
  const context = useContext(Context);

  useEffect(() => {
    context.setCollapseSidebar(true);
  }, []);

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

  const pclayout = () => {
    if (context.deviceType == 0) {
      return (
        <div className={cx('left-side')}>
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
        <aside className={cx("main-content-full")} style={{ display: 'flex' }}>
          {pclayout()}
          {children}
        </aside>
      </div>
    </MainLayout>
  );
}
