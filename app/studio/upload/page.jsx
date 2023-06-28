"use client";
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, } from 'firebase/storage'
import { useContext, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/studio/upload.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import Context from "@/GlobalVariableProvider/Context";
import clsx from 'clsx'
import NotiBoard from "@/components/NotificationBoard";


function makeid() {
  let length = 8;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const getFileExt = (fileName) => {
  return fileName.name.substring(fileName.name.lastIndexOf(".") + 1);
};

export default function UploadPage() {
  const context = useContext(Context)
  const cx = classNames.bind(styles);
  const router = useRouter();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewFile, setVideoPreviewFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewFile, setImagePreviewFile] = useState(null);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(0);
  const [des, setDes] = useState("");
  const [channelData, setChannelData] = useState({});
  const [agreeTermsOfService, setAgreeTermsOfService] = useState(false)

  const handleUploadVideo = (file) => {
    setVideoFile(file);
    setVideoPreviewFile(URL.createObjectURL(file));
  };

  const handleUploadImage = (file) => {
    setImageFile(file);
    setImagePreviewFile(URL.createObjectURL(file));
  };

  useLayoutEffect(() => {
    if (context.ses != null && context.ses != undefined) {
      axios.get(
        `/api/channel/getdatabyaccountid`, {
        params: {
          accountId: context.ses.user.id
        }
      }
      ).then(res => { setChannelData(res.data) })
    }

  }, [context.ses])

  const handleFinal = async () => {

    if (videoFile == null || imageFile == null || title.trim().length == 0) {

    } else {
      console.log(channelData)
      if (channelData != null) {
        let t = makeid();
        const videoStorageRef = ref(storage, `/video/videos/${t}`)
        const thumbnailStorageRef = ref(storage, `/video/thumbnails/${t}`)
        axios
          .post("/api/video/create", {
            title: title,
            des: des,
            mode: mode,
            link: t,
            channelId: channelData.id,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        uploadBytes(videoStorageRef, videoFile).then(() => { console.log("video uploaded") })
        uploadBytes(thumbnailStorageRef, imageFile).then(() => { console.log("thumbnail uploaded") })

      }
    }
  };

  return (
    <>
      <div className={cx('box')}>
        <div className={cx('left-housing')}>
          <h3>Thông tin cơ bản</h3>
          <div className={cx('label-box')}>
            <label htmlFor="title">
              tiêu đề
            </label>
          </div>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className={cx('label-box')}>
            <label htmlFor="description">
              mô tả
            </label>
          </div>
          <textarea
            id="description"
            className={cx("description")}
            onChange={(e) => {
              setDes(e.target.value);
            }}
          ></textarea>
          <div className={cx('label-box')}><h4>chế độ video</h4></div>
          <div className={cx("video-mode-box")}>
            <input
              type="radio"
              name="mode"
              value={0}
              defaultChecked={true}
              onClick={() => setMode(0)}
            />
            <p onClick={() => setMode(0)}>
              công khai
            </p>
            <input
              type="radio"
              name="mode"
              value={1}
              onClick={() => setMode(1)}
            />
            <p onClick={() => setMode(1)}>
              không công khai
            </p>
            <input
              type="radio"
              name="mode"
              value={2}
              onClick={() => setMode(2)}
            />
            <p onClick={() => setMode(2)}>
              riêng tư
            </p>
          </div>
        </div>
        <div className={cx('right-housing')}>
          <h3>tải dữ liệu lên</h3>
          <div className={cx('video-upload-box')}>
            <div>
              <h4>video</h4>
              <div className={cx("uploader-box")}>
                <label htmlFor="file-upload" className={cx("inside-uploader")}>
                  tải lên
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className={cx("file-upload")}
                  onChange={(e) => {
                    handleUploadVideo(e.target.files[0]);
                  }}
                ></input>
              </div>
            </div>
            <video src={videoPreviewFile} className={cx("video")} autoPlay></video>
          </div>
          <div className={cx('thumbnail-upload-box')}>
            <h4>ảnh nền</h4>
            <div>
              <div className={cx("uploader-box")}>
                <label htmlFor="thumbnail-upload" className={cx("inside-uploader")}>
                  tải ảnh lên
                </label>
                <input
                  type="file"
                  id="thumbnail-upload"
                  className={cx("file-upload")}
                  onChange={(e) => {
                    handleUploadImage(e.target.files[0]);
                  }}
                ></input>
              </div>
              <img src={imagePreviewFile} className={cx("thumbnail-preview")}></img>
              <div>
                <p className={cx('maybe-disable')}>sau này mình sẽ phát triển phần tự tạo ảnh nền cắt từ khung hình của video nên chỗ này tạm để trống</p>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className={cx('last-box')}>
        <div>
          <input type="checkbox" onClick={() => setAgreeTermsOfService(!agreeTermsOfService)} />
          <p className={cx('term-of-user')} onClick={() => router.push("/termofuser")}>bằng cách tick vào ô này, bạn đồng ý với điều khoản đăng tải nội dung của tôi</p>
        </div>

        <button
          className={clsx({ [cx("finish-form-button")]: agreeTermsOfService }, { [cx("finish-form-button-dis")]: !agreeTermsOfService })}
          onClick={() => {
            handleFinal();
          }}
          disabled={!agreeTermsOfService}
        >
          hoàn thành
        </button>
      </div>
    </>
  );
}
