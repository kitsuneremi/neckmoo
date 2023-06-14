'use client'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminvideo.module.scss'
import axios from 'axios'

const cx = classNames.bind(styles)

const Videobox = (val) => {
  const [showEdit, setShowEdit] = useState(false)
  const [name, setName] = useState("")
  const [des, setDes] = useState("")


  const handleUpdate = () => {
    axios.post('/api/video/update', {
      id: val.id,
      name: name,
      des: des
    })
  }

  const handleDelete = () => {
    axios.post('/api/video/delete', {
      id: val.id,
      link: val.link
    }).then((response) => {
      console.log('Delete request successful:', response);
    })
      .catch((error) => {
        console.error('Delete request error:', error);
      });
  }
  return (
    <>
      <div className={cx('infomation-box')}>
        <div className={cx('row-0')}><p>{val.serial}</p></div>
        <div className={cx('row-1')}><img src={`http://localhost:5000/api/fileout/videoimage/${val.link}`}></img></div>
        <div className={cx('row-2')}><p>{val.title}</p></div>
        <div className={cx('row-3')}><p>{val.des}</p></div>
        <div className={cx('row-4')}><p>{val.channelName}</p></div>
        <div className={cx('row-5')}><button onClick={() => { setShowEdit(!showEdit) }}>chỉnh sửa</button></div>
      </div>
      {showEdit && <div className={cx('edit-box')}>
        <div>
          <div>
            <div>tên video</div>
            <input value={name} onChange={e => setName(e.target.value)}></input>
          </div>
          <div>
            <div>mô tả</div>
            <input value={des} onChange={e => { setDes(e.target.value) }} />
          </div>
        </div>
        <div>
          <button className={cx('update')} onClick={() => { handleUpdate() }}>cập nhật</button>
          <button className={cx('delete')} onClick={() => { handleDelete() }}>xóa</button>
        </div>
      </div>}
    </>
  )
}

const Page = () => {

  const [listVideo, setListVideo] = useState([])

  useEffect(() => {
    axios.get('/api/video/all').then(res => { setListVideo(res.data) })
  }, [])
  return (
    <div>
      <input placeholder='search' className={cx('search')} />
      <div className={cx('title-box')}>
        <div className={cx('row-0')}><p>stt</p></div>
        <div className={cx('row-1')}><p>hình ảnh</p></div>
        <div className={cx('row-2')}><p>tên video</p></div>
        <div className={cx('row-3')}><p>mô tả</p></div>
        <div className={cx('row-4')}><p>kênh phát hành</p></div>
        <div className={cx('row-5')}><p></p></div>
      </div>
      <div className={cx('video-manage-box')}>
        {listVideo.map((video, index) => {
          return <Videobox key={index} serial={index} id={video.id} tagName={video.tagName} link={video.link} title={video.title} des={video.des} channelName={video.name}></Videobox>
        })}
      </div>
    </div>
  )
}

export default Page