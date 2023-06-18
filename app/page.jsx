import styles from "@/styles/home.module.scss";
import classNames from "classnames/bind";
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'
import prisma from "@/lib/prisma";
import Link from 'next/link'
const cx = classNames.bind(styles);

export const metadata = {
  title: 'Home - Carymei',
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
  const video = await GetAllVideo()

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

const HomeVideoItem = async (val) => {
  // const router = useRouter();
  const cx = classNames.bind(styles);
  const name = val.title
  const view = val.view

  const channelAvatarStorageRef = ref(storage, `/channel/avatars/${val.tagName}`)
  const channelAvatar = await getDownloadURL(channelAvatarStorageRef)
  const videoImageStorageRef = ref(storage, `/video/thumbnails/${val.link}`)
  const img = await getDownloadURL(videoImageStorageRef)


  return (
    <div className={cx("box")}>
      <Link href={`/watch/${val.link}`}><img className={cx("thumbnail")} src={img}></img></Link>
      <div>
        <Link href={`/channel/${val.tagName}`}><img className={cx("icon")} src={channelAvatar}></img></Link>
        <div>
          <div>
            <Link href={`/watch/${val.link}`}>
              <p className={cx("title")}>{name}</p>
            </Link>
          </div>
          <div className={cx('channel-name-box')}>
            <Link href={`/channel/${val.tagName}`}>
              <p className={cx("channel-name")}>
                {val.channelName}
              </p>
            </Link>
          </div>
          <div>
            <p className={cx("video-details")}>{view} lượt xem</p>
            <p className={cx("video-details")}>{val.status == 0 ? 'công khai' : 'không công khai'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
