
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import classNames from "classnames/bind";
import style from "@/styles/channel/channel.module.scss";
import dynamic from 'next/dynamic'
import ChannelTabModule from '/components/channel/TabModule'
const cx = classNames.bind(style);

const SubcribeButton = dynamic(() => import("@/components/watch/SubcribeButton"))
// const ChannelTabModule = dynamic(() => import("@/components/channel/TabModule"))

export async function generateMetadata({ params }) {
  const channel = await fetch(`https://www.erinasaiyukii.com/api/channel?tagName=${params.link}`, {
    method: 'GET'
  }).then(res => res.json())

  return {
    title: channel.name,
    description: channel.des
  }
}

const channelBasicData = async (slug) => {
  // kiểu lấy fetch data bằng fecth
  const x = await fetch(`https://www.erinasaiyukii.com/api/channel/basicdata?tagName=${slug}`, {
    method: 'GET'
  })
  return x.json();
}

export default async function Channel({ params }) {

  const slug = params.link;

  const channelData = await channelBasicData(slug)

  const avaRef = ref(storage, `/channel/avatars/${channelData.tagName}`)
  const bannerRef = ref(storage, `/channel/banners/${channelData.tagName}`)

  const avatar = await getDownloadURL(avaRef)
  const banner = await getDownloadURL(bannerRef)

  return (
    <main>
      <div className={cx("inside-content")}>
        <img className={cx("banner")} src={banner} loading="lazy" />
        <div className={cx("below-content")}>
          <div className={cx("top-side")}>
            <div className={cx("left-housing")}>
              <img src={avatar} className={cx("avatar")} loading="lazy" />
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
                  <p className={cx("infomation")}>{channelData != null ? `${channelData.sub} sub` : ""}</p>
                  <p className={cx("infomation")}>
                    {channelData != null ? `${channelData.video} video` : ""}
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
              <SubcribeButton channelData={channelData} />
            </div>
          </div>

          <ChannelTabModule tagName={channelData.tagName} />
        </div>
      </div>
    </main>
  );
}


 