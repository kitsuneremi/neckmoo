'use client'
import clsx from "clsx";
// import Feature from "./Feature";
import Videos from "./Videos";
import classNames from "classnames/bind";
import style from "@/styles/channel/channel.module.scss";
import { useState } from "react";
import dynamic from "next/dynamic";

const Feature = dynamic(() => import("./Feature"), {loading: () => {return <div>loading...</div>}})

const cx = classNames.bind(style);

function TabModule({ tagName }) {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabSelector = () => {
        const tabs = [
            {
                index: 0,
                title: "TRANG CHỦ",
            },
            {
                index: 1,
                title: "VIDEO",
            },
            {
                index: 2,
                title: "DANH SÁCH PHÁT",
            },
            {
                index: 3,
                title: "CỘNG ĐỒNG",
            },
            {
                index: 4,
                title: "KÊNH",
            },
            {
                index: 5,
                title: "GIỚI THIỆU",
            },
        ];

        return (
            <>
                <div>
                    {tabs.map((tab, index) => {
                        return (
                            <button
                                key={index}
                                className={clsx(
                                    { [cx("selected-tab")]: selectedTab === index },
                                    { [cx("tab")]: selectedTab !== index }
                                )}
                                onClick={() => {
                                    setSelectedTab(index);
                                }}
                            >
                                {tab.title}
                            </button>
                        );
                    })}
                </div>
            </>
        );
    };


    const contentRender = () => {
        if (selectedTab === 0) {
            return <Feature tagName={tagName}></Feature>;
        } else {
            return <Videos tagName={tagName}></Videos>;
        }
    };
    return (
        <>
            <div className={cx("tab-selector")}>{tabSelector()}</div>
            <div className={cx('content-render')}>{contentRender()}</div>
        </>
    )
}

export default TabModule