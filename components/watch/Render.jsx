'use client'
import { useState, useContext, useLayoutEffect, Suspense } from "react";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/watch/watch.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";
import Properties from '@/components/watch/Properties'
import DescriptionBox from '@/components/watch/DescriptionBox'
import Comments from '@/components/watch/Comments'
// import Player from '@/components/watch/Player'
import List from "@/components/watch/List";
import dynamic from "next/dynamic";

const cx = classNames.bind(style);
const Player = dynamic(() => import('@/components/watch/Player'))

const Tab = ({ link }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const ViewTab = () => {
        if (selectedTab == 0) {
            return <Comments link={link} />
        } else if (selectedTab == 1) {
            return <List />
        } else {
            return <></>
        }
    }
    const btn = [
        {
            'title': 'bình luận',
        },
        {
            'title': 'danh sách phát',
        },
        {
            'title': 'video khác',
        }
    ]

    return (
        <>
            <div className={cx('selection')}>
                {btn.map((b, index) => {
                    return (
                        <button key={index} className={
                            clsx({ [cx('tab-button')]: (selectedTab !== index) }, { [cx('selected-tab-button')]: (selectedTab === index) })
                        } onClick={() => { setSelectedTab(index) }}>{b.title}</button>
                    )
                })}
            </div>
            <div className={cx('selection-render')}>
                {ViewTab()}
            </div>
        </>
    )
}

const finalRender = ({ link }) => {
    const context = useContext(Context);
    useLayoutEffect(() => {
        context.setCollapseSidebar(false);
    }, []);

    if (context.deviceType === 0) {
        return (
            <>
                <div className={cx("left-housing")}>
                    <Suspense fallback={<h1>loading</h1>}><Player link={link} /></Suspense>
                    <div className={cx("below-box")}>
                        <Properties link={link} />
                        <DescriptionBox link={link} />
                        <Comments link={link} />
                    </div>
                </div>
                <div className={cx("right-housing")}>
                    <List />
                </div>
            </>
        )
    } else if (context.deviceType === 1 || context.deviceType === 2) {
        return (
            <>
                <Player link={link} />
                <div className={cx('below-side')}>
                    <Properties link={link} />
                    <DescriptionBox link={link} />
                    <Tab link={link} />
                </div>
            </>
        )
    }
}

export default finalRender