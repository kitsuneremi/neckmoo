"use client";
import styles from "@/styles/home.module.scss";
import classNames from "classnames/bind";
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
const cx = classNames.bind(styles);

export default function Home() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/all").then((res) => setVideo(res.data));
  }, []);

  const render = () => {
    if (video.length != 0)
      return video.map((vid, index) => {
        return (
          <HomeVideoItem
            key={index}
            link={vid.link}
            status={vid.status}
            view={vid.view}
            title={vid.title}
            tagName={vid.tagName}
            channelName={vid.name}
          ></HomeVideoItem>
        );
      });
  };
  return (
    <MainLayout>
      <MainSidebarLayout>
        <main className={cx("content-body")}>{render()}</main>
      </MainSidebarLayout>
    </MainLayout>
  );
}

const HomeVideoItem = (val) => {
  const router = useRouter();
  const cx = classNames.bind(styles);
  const [img, setImg] = useState(null);
  const [name, setName] = useState(val.title);
  const [view, setView] = useState(val.view);
  const [link, setLink] = useState(val.link);
  const [channelAvatar, setChannelAvatar] = useState(null);
  useLayoutEffect(() => {
    if (val.link) {
      const channelAvatarStorageRef = ref(storage, `/channel/avatars/${val.tagName}`)
      getDownloadURL(channelAvatarStorageRef).then(url => setChannelAvatar(url))
      const videoImageStorageRef = ref(storage, `/video/thumbnails/${val.link}`)
      getDownloadURL(videoImageStorageRef).then(url => setImg(url))
    }
  }, []);

  return (
    <div
      className={cx("box")}

    >
      <img className={cx("thumbnail")} src={img} onClick={() => {
        router.push(`/watch/${link}`);
      }}></img>
      <div>
        <img className={cx("icon")} src={channelAvatar} onClick={() => {
            router.push(`/channel/${val.tagName}`);
          }}></img>
        <div>
          <div>
            <p className={cx("title")}>{name}</p> 
          </div>
          <div className={cx('channel-name-box')} onClick={() => {
            router.push(`/channel/${val.tagName}`);
          }}>
            <p className={cx("channel-name")}>
              {val.channelName}
            </p>
          </div>
          <div>
            <p className={cx("video-details")}>{view} lượt xem</p>
            <p className={cx("video-details")}>{val.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
