import styles from "@/styles/home/home.module.scss";
import classNames from "classnames/bind";
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import prisma from "@/lib/prisma";
// import HomeVideoItem from '@/components/home/VideoItem'
import { Suspense } from "react";
import { baseURL } from "@/function/function";
import dynamic from "next/dynamic"

const HomeVideoItem = dynamic(() => import('@/components/home/VideoItem'))
const cx = classNames.bind(styles);

export const metadata = {
  title: 'Trang chủ - neckmoo',
}

const GetAllVideo = async function () {
  const list = await fetch(`${baseURL}/api/video/all`, {
    method: 'GET',
  })

  return await list.json()
}

export default async function Home() {
  // await axios.get("/api/video/all")
  //lấy danh sách video
  const ListVideo = await GetAllVideo()

  //hàm render trả ra các thẻ video nằm trên trang chủ
  const render = () => {
    if (ListVideo.length != 0)
      return ListVideo.map((v, index) => {
        return (
          <Suspense fallback={<div>loading...</div>} key={index}>
            <HomeVideoItem
              key={index}
              videoData={v.videoData}
              channelData={v.channelData}
            ></HomeVideoItem>
          </Suspense>
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

