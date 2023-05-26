"use client";
import clsx from "clsx";
import classNames from "classnames/bind";
import styles from "@/styles/registerChannel.module.scss";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
export default function RegisterChannel() {
  const cx = classNames.bind(styles);
  const [channelName, setChannelName] = useState("");
  const [tagName, setTagName] = useState("");
  const [des, setDes] = useState("");
  const { data: session } = useSession();

  const [avatar, setAvatar] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [originalAvatar, setOriginalAvatar] = useState(null);
  const [originalThumbnail, setOriginalThumbnail] = useState(null);

  const [nameError, setNameError] = useState(false);
  const [tagNameError, setTagNameError] = useState(false);
  const [desError, setDesError] = useState(false);

  const handleSubmitForm = () => {
    if (session && session.user) {
      axios.post(
        "api/channel/create",
        {
          name: channelName,
          tagName: tagName,
          des: des,
          accountId: session.user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: session.user.accessToken,
          },
        }
      );

      axios.post('localhost:5000/api/filein/channelavatar', {
        image: originalAvatar
      })
      axios.post('localhost:5000/api/filein/channelbanner', {
        image: originalThumbnail
      })
    }
  };

  const handleChangeName = (value) => {
    if (channelName.length > 20) {
      setNameError(true);
      setChannelName(value.substring(0, 20));
    } else {
      setNameError(false);
      setChannelName(value);
    }
  };

  const handleChangeTagName = (value) => {
    if (tagName.length > 20) {
      setTagName(value.substring(0, 20));
      setTagNameError(true);
    } else {
      setTagName(value);
      setTagNameError(false);
    }
  };

  const handleChangeDes = (value) => {
    if (des.length > 200) {
      setDes(value.substring(0, 200));
      setDesError(true);
    } else {
      setDes(value);
      setDesError(false);
    }
  };

  const handleThumbnailFile = (file) => {
    if (file) {
      setOriginalAvatar(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleAvatarFile = (file) => {
    if (file) {
      setOriginalThumbnail(file);
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className={cx("box")}>
      <div className={cx("left-housing")}>
        <h2>thông tin</h2>
        <p>tên</p>
        <input
          className={clsx(
            { [cx("input-error")]: nameError },
            { [cx("input")]: !nameError }
          )}
          value={channelName}
          onChange={(e) => {
            handleChangeName(e.target.value);
          }}
        />
        <p>tên thẻ</p>
        <input
          className={clsx(
            { [cx("input-error")]: tagNameError },
            { [cx("input")]: !tagNameError }
          )}
          value={tagName}
          onChange={(e) => {
            handleChangeTagName(e.target.value);
          }}
        />
        <p>mô tả kênh</p>
        <textarea
          className={clsx(
            { [cx("description-error")]: desError },
            { [cx("description")]: !desError }
          )}
          value={des}
          onChange={(e) => {
            handleChangeDes(e.target.value);
          }}
        ></textarea>
        <div className={cx("upload-box")}>
          <div>
            <p>chọn ảnh đại diện</p>
            <div className={cx("uploader-box")}>
              <label htmlFor="avatar-upload" className={cx("inside-uploader")}>
                +
              </label>
              <input
                type="file"
                id="avatar-upload"
                className={cx("file-upload")}
                onChange={(e) => {
                  handleAvatarFile(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>
          <div>
            <p>chọn ảnh nền</p>
            <div className={cx("uploader-box")}>
              <label
                htmlFor="thumbnail-upload"
                className={cx("inside-uploader")}
              >
                +
              </label>
              <input
                type="file"
                id="thumbnail-upload"
                className={cx("file-upload")}
                onChange={(e) => {
                  handleThumbnailFile(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>
        </div>
        <button
          className={cx("submit-form")}
          onClick={() => {
            handleSubmitForm();
          }}
        >
          hoàn thành
        </button>
      </div>
      <div className={cx("right-housing")}>
        <h2>preview</h2>
        <div className={cx("preview-box")}>
          <img src={thumbnail} className={cx("background-image")} />
          <div>
            <img src={avatar} className={cx("avatar")} />
            <div>
              <p className={cx("channel-name")}>{channelName}</p>
              <p className={cx("tagname")}>
                {tagName === "" ? "" : `@${tagName}`}{" "}
              </p>
              <p className={cx("des")}>
                {des.length > 30 ? `${des.substring(0, 30)}...` : des}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
