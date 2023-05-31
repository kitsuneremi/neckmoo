"use client";
import styles from "@/styles/upload.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Context from "@/GlobalVariableProvider/Context";
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
      ).then(res => { setChannelData(res.data)})
    }

  }, [context.ses])

  const handleFinal = async () => {
    if (videoFile == null || imageFile == null || title.trim().length == 0) {
    } else {
      if (channelData != null) {
        const videoFormData = new FormData();
        const imageFormData = new FormData();
        let t = makeid();
        videoFormData.append("video", videoFile, t + "." + getFileExt(videoFile));
        imageFormData.append("image", imageFile, t + "." + getFileExt(imageFile));

        await axios
          .post("http://localhost:5000/api/filein/video", videoFormData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

        await axios
          .post("http://localhost:5000/api/filein/videoimg", imageFormData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        await axios
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
      }
    }
  };

  return (
    <div className={cx("box")}>
      <div className={cx("left-housing")}>
        <p>tải video lên</p>
        <div className={cx("video-upload-box")}>
          <div className={cx("uploader-box")}>
            <label htmlFor="file-upload" className={cx("inside-uploader")}>
              +
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

          <div className={cx("video-infomation-box")}>
            <p className={cx("text")}>tên file</p>
            <p className={cx("text")}>định dạng</p>
            <p className={cx("text")}>kích thước</p>
            <p className={cx("text")}>độ dài</p>
          </div>
        </div>
        <div className={cx("video-detail-box")}>
          <p className={cx("title")}>tiêu đề</p>
          <input
            className={cx("input")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p className={cx("title")}>mô tả</p>
          <textarea
            className={cx("description")}
            onChange={(e) => {
              setDes(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={cx("video-mode-box")}>
          <input
            type="radio"
            name="mode"
            value={0}
            defaultChecked={true}
            onClick={() => setMode(0)}
          />
          <p className={cx("p")} onClick={() => setMode(0)}>
            công khai
          </p>
          <input
            type="radio"
            name="mode"
            value={1}
            onClick={() => setMode(1)}
          />
          <p className={cx("p")} onClick={() => setMode(1)}>
            không công khai
          </p>
          <input
            type="radio"
            name="mode"
            value={2}
            onClick={() => setMode(2)}
          />
          <p className={cx("p")} onClick={() => setMode(2)}>
            riêng tư
          </p>
        </div>
        <button
          className={cx("finish-form-button")}
          onClick={() => {
            handleFinal();
          }}
        >
          hoàn thành
        </button>
      </div>
      <div className={cx("right-housing")}>
        <video src={videoPreviewFile} className={cx("video")} autoPlay></video>
        <div className={cx("video-link-box")}>
          <p className={cx("name")}>đường dẫn video:</p>
        </div>
        <div className={cx("thumbnail-upload-box")}>
          <div className={cx("uploader-box")}>
            <label htmlFor="thumbnail-upload" className={cx("inside-uploader")}>
              +
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
        </div>
      </div>
    </div>
  );
}
