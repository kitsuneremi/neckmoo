import { useState, useEffect, useRef, useContext, memo } from "react"
import { Space, Row, Col, Drawer } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import Context from '../../GlobalVariableStorage/Context'
import Item from '../../sp/partials/sidebar/SideBarItem';
import VideoItem from '../../sp/inside/VideoItem';
import style from '../../styles/Home.module.scss'
import Navx from "../../sp/partials/navbar/Nav";
import axios from "axios";
import classNames from "classnames/bind";
function Home() {
  const cx = classNames.bind(style)
  //useContext
  const context = useContext(Context)

  //useRef
  const sidebarRef = useRef()

  //useState
  const [needDrawer, setNeedDrawer] = useState(false)
  const [SidebarWidth, setSidebarWidth] = useState(2)
  const [listVideo, setListVideo] = useState([])

  //useEffect
  useEffect(() => {
    context.sidebarstatus ? setSidebarWidth(3) : setSidebarWidth(2)
  }, [context.sidebarstatus])

  useEffect(() => {
    if (context.drawerstatus && needDrawer) {
      setSidebarWidth(2)
    }
  }, [context.drawerstatus])

  //call api lấy dữ liệu video ra trang chủ
  useEffect(() => {
    axios.get('http://localhost:5000/api/video')
      .then(res => { setListVideo(res.data) })
  }, [])

  useEffect(() => {
    let windowWidth = window.innerWidth
    if (windowWidth < 1300) {
      setSidebarWidth(2)
      setNeedDrawer(true)
    } else if (windowWidth >= 1300) {
      setSidebarWidth(3)
      setNeedDrawer(false)
    }
  }, [])

  //function
  const thisIsDrawer = () => {
    if (context.sidebarstatus) {
      if (needDrawer) {
        if (context.drawerstatus) {
          return <Drawer
            title="Basic Drawer"
            placement='left'
            closable={true}
            closeIcon={true}
            width={200}
            onClose={() => {
              context.setFalseShowDrawer();
              context.setFlagDetailSidebar()
            }}
            open={context.drawerstatus}
            extra={
              <Space>
                <CloseOutlined onClick={() => { context.setFalseShowDrawer(); context.setFlagDetailSidebar() }} />
              </Space>
            }
          >
            <Item show={true}></Item>
          </Drawer>;
        }
      } else {
        return (
          <Item show={true}></Item>
        )
      }
    } else {
      return (
        <Item show={false}></Item>
      )
    }
  }


  return (
    <div className="App" style={{ overflow: 'hidden' }}>
      {/* <Navx /> */}

      <Row style={{ width: "fit-content" }}>
        <Col span={SidebarWidth} className={cx('sidebar')} ref={sidebarRef}>
          {thisIsDrawer()}
        </Col>
        <Col span={24 - SidebarWidth} className={cx('main-content')}>
          <Row className={cx('inside-content')}>
            {listVideo.length == 0 ? <p>loading....</p> : listVideo.map((video, index) => 
              <VideoItem key={index} name={video.title} channel={video.title} videoId={video.videoId} channelName={video.channelName} link={video.link}/>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default memo(Home);

