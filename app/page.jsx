import styles from "@/styles/home/home.module.scss";
import classNames from "classnames/bind";
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import prisma from "@/lib/prisma";
import HomeVideoItem from '@/components/home/VideoItem'
const cx = classNames.bind(styles);

export const metadata = {
  title: 'Home',
}

const GetAllVideo = async function () {
  const video = await prisma.videos.findMany();
  const wait = new Promise((resolve, reject) => {
    const list = [];
    const promises = video.map(async (item) => {
      const channelData = await prisma.channels.findFirst({
        where: {
          id: item.channelId
        }
      });
      const middle = { ...item, tagName: channelData.tagName, name: channelData.name }
      list.push(middle);
    });
    Promise.all(promises)
      .then(() => {
        resolve(list);
      })
      .catch((error) => {
        reject(error);
      });
  })
  return wait.then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

export default async function Home() {
  // await axios.get("/api/video/all")
  //lấy danh sách video
  const ListVideo = await GetAllVideo()

  //hàm render trả ra các thẻ video nằm trên trang chủ
  const render = () => {
    if (ListVideo.length != 0)
      return ListVideo.map((video, index) => {
        return (
          <HomeVideoItem
            key={index}
            link={video.link}
            status={video.status}
            view={video.view}
            title={video.title}
            tagName={video.tagName}
            channelName={video.name}
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

