"use client";
import { useState, useEffect, useContext, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import axios from "axios";
import classNames from "classnames/bind";
import clsx from "clsx";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/channel.module.scss";
import Feature from "@/components/inside/Feature";
import Videos from "@/components/inside/Videos";
import Image from "next/image";

export default function Channel({ params }) {
  const router = useRouter();
  const cx = classNames.bind(style);
  const slug = params.link;
  //useContext
  const context = useContext(Context);

  //useState
  const [selectedTab, setSelectedTab] = useState(0);
  const [channelData, setChannelData] = useState({});
  const [subcribed, setSubcribed] = useState(false);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => { }, [selectedTab]);

  useEffect(() => {
    if (!slug) return;
    axios.get(`/api/channel/basicdata`, {
      params: {
        tagName: slug
      }
    }).then((res) => {
      setChannelData(res.data);
    });
  }, []);

  useEffect(() => {
    if (channelData.tagName) {
      const avaRef = ref(storage, `/channel/avatars/${channelData.tagName}`)
      const bannerRef = ref(storage, `/channel/banners/${channelData.tagName}`)

      getDownloadURL(avaRef).then(url => setAvatar(url))
      getDownloadURL(bannerRef).then(url => setBanner(url))
    }
  }, [channelData])




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
      return <Feature slug={params.link}></Feature>;
    } else {
      return <Videos></Videos>;
    }
  };

  return (
    <main>
      <div className={cx("inside-content")}>
        <img className={cx("banner")} src={avatar} loading="lazy" />
        <div className={cx("below-content")}>
          <div className={cx("top-side")}>
            <div className={cx("left-housing")}>
              <img src={banner} className={cx("avatar")} loading="lazy" />
              <div className={cx("data")}>
                <div>
                  <p className={cx("name")}>
                    {channelData ? channelData.name : ""}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <p className={cx("infomation")}>
                    {channelData ? channelData.tagName : ""}
                  </p>
                  <p className={cx("infomation")}>{channelData != null ? `${channelData.sub}sub` : ""}</p>
                  <p className={cx("infomation")}>
                    {channelData != null ? `${channelData.video}video` : ""}
                  </p>
                </div>
                <div>
                  <p className={cx("description")}>
                    {channelData ? channelData.des : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("right-housing")}>
              <button
                className={clsx(
                  { [cx("subcribe-button")]: !subcribed },
                  { [cx("unsubcribe-button")]: subcribed }
                )}
                onClick={() => {
                  setSubcribed(!subcribed);
                }}
              >
                {subcribed ? "đã đăng ký" : "đăng ký"}
              </button>
            </div>
          </div>

          <div className={cx("tab-selector")}>{tabSelector()}</div>
          <div className={cx('content-render')}>{contentRender()}</div>
        </div>
      </div>
    </main>
  );
}
