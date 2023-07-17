'use client'
import { useState, useLayoutEffect, Suspense } from "react";
import style from "@/styles/watch/watch.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";
import Properties from '@/components/watch/Properties'
import DescriptionBox from '@/components/watch/DescriptionBox'
import Comments from '@/components/watch/Comments'
// import Player from '@/components/watch/Player'
import List from "@/components/watch/List";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/storage";
import { useDispatch } from 'react-redux'
import { close } from "@/redux/features/sidebar-slice";
import { useMediaQuery } from 'usehooks-ts'


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

export default function FinalRender({ link }) {
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)
    const dispatch = useDispatch()

    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }

    useLayoutEffect(() => {
        dispatch(close())
    }, []);

    if (deviceType.isPc) {
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
    } else if (deviceType.isTablet || deviceType.isMobile) {
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

    return <></>
}
