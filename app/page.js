'use client'
import HomeVideoItem from '@/components/HomeVideoItem'
import styles from '@/styles/home.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useContext } from 'react'
import Context from '@/GlobalVariableProvider/Context'
import Sidebar from '@/components/DefaultSidebar'
import Navbar from '@/components/Navbar'
import clsx from 'clsx'
const cx = classNames.bind(styles)


export default function Home() {
  const context = useContext(Context)
  useEffect(() => {
    context.setCollapseSidebar(false)
  },[])
  return (
    <>
      <div className={cx('navbar')}>
        <Navbar></Navbar>
      </div>
      <div className={cx('box')}>
        <aside className={clsx({ [cx('sidebar-collapse')]: context.collapseSidebar }, { [cx('sidebar-expand')]: !context.collapseSidebar })}><Sidebar /></aside>
        <aside className={clsx({ [cx('main-content-expand')]: context.collapseSidebar }, { [cx('main-content-collapse')]: !context.collapseSidebar })}>
          <main className={cx('content-body')}>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
            <HomeVideoItem link='JHHQ735r'></HomeVideoItem>
            <HomeVideoItem link='VdgPCZGt'></HomeVideoItem>
          </main>
        </aside>
      </div>
    </>
  )
}
