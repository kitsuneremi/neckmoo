"use client";
import styles from "@/styles/home.module.scss";
import classNames from "classnames/bind";
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);

export async function getServerSideProps() {
  return {
    props: {
      video: video,
    },
  };
}

export default function Home() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/all").then((res) => setVideo(res.data));
  }, []);

  const render = () => {
    if (video.length != 0)
      return video.map((vid, index) => {
        console.log(vid);
        return (
          <HomeVideoItem
            key={index}
            link={vid.link}
            status={vid.status}
            view={vid.view}
            title={vid.title}
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
  useEffect(() => {
    val.link &&
      axios
        .get(`http://localhost:5000/api/fileout/videoimage/${val.link}`, {
          responseType: "blob",
        })
        .then((res) => {
          var binaryData = [];
          binaryData.push(res.data);
          setImg(
            window.URL.createObjectURL(
              new Blob(binaryData, { type: "image/jpeg" })
            )
          );
        });
  }, []);

  return (
    <div
      className={cx("box")}
      onClick={() => {
        router.push(`/watch/${link}`);
      }}
    >
      <img className={cx("thumbnail")} src={img}></img>
      <div>
        <img className={cx("icon")} src={``}></img>
        <div>
          <div>
            <p className={cx("title")}>{name}</p>
          </div>
          <div>
            <p
              className={cx("video-details")}
              onClick={() => {
                router.push("/");
              }}
            >
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
