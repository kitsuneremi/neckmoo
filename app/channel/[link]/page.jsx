"use client";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import classNames from "classnames/bind";
import clsx from "clsx";
import Context from "@/GlobalVariableProvider/Context";
import style from "@/styles/channel.module.scss";
import Feature from "@/components/inside/Feature";
import Videos from "@/components/inside/Videos";

export default function Channel({ params }) {
  const router = useRouter();
  const cx = classNames.bind(style);
  const slug = params.link;
  //useContext
  const context = useContext(Context);

  //useState
  const [selectedTab, setSelectedTab] = useState(0);
  const [listVideo, setListVideo] = useState([]);
  const [channelData, setChannelData] = useState({});
  const [subcribed, setSubcribed] = useState(false);

  useEffect(() => {}, [selectedTab]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/video").then((res) => {
      setListVideo(res.data);
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    axios.get(`/api/channel/basicdata/${slug}`).then((res) => {
      setChannelData(res.data);
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/fileout/channelavatar/${slug}`)
  //     .then((res) => {
  //       setAvatar(res.data);
  //     });
  //   axios
  //     .get(`http://localhost:5000/api/fileout/channelbanner/${slug}`)
  //     .then((res) => {
  //       setBanner(res.data);
  //     });
  // }, []);

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
      <div className={cx("tab-selector")}>
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
        <img className={cx("banner")} src={`http://localhost:5000/api/fileout/channelbanner/${slug}`} />
        <div className={cx("below-content")}>
          <div className={cx("top-side")}>
            <div className={cx("left-housing")}>
              <img src={`http://localhost:5000/api/fileout/channelavatar/${slug}`} className={cx("avatar")} />
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
                  <p className={cx("infomation")}>Sub count</p>
                  <p className={cx("infomation")}>
                    {listVideo ? `${listVideo.length} Video` : 0}
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
          <div>{contentRender()}</div>
        </div>
      </div>
    </main>
  );
}
