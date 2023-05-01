import { useState, useEffect, useRef, useContext, memo } from "react"
import { Space, Row, Col, Drawer } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import Context from '../../../../GlobalVariableStorage/Context'
import Item from '../../partials/sidebar/SideBarItem';
import style from '../../../styles/Channel.module.scss'
import Navx from "../../partials/navbar/Nav";
import axios from "axios";
import classNames from "classnames/bind";

function Channel() {
  const { slug } = useParams;
  const cx = classNames.bind(style)
  //useContext
  const context = useContext(Context)

  //useRef
  const sidebarRef = useRef()

  //useState
  const [needDrawer, setNeedDrawer] = useState(false)
  const [SidebarWidth, setSidebarWidth] = useState(2)
  // test axios
  const [listVideo, setListVideo] = useState([])



  //useEffect
  useEffect(() => {
    context.sidebarstatus ? setSidebarWidth(3) : setSidebarWidth(2)
  }, [context.sidebarstatus])

  useEffect(() => {
    const handleCollapse = () => {
      let windowWidth = window.innerWidth
      if (windowWidth < 1300) {
        setSidebarWidth(2)
        setNeedDrawer(true)
      } else if (windowWidth >= 1300) {
        setSidebarWidth(3)
        setNeedDrawer(false)
      }
    }
    window.addEventListener('resize', handleCollapse)
    return () => {
      window.removeEventListener('resize', handleCollapse)
    }
  }, [])



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
      <Navx />

      <Row style={{ width: "fit-content" }}>
        <Col span={SidebarWidth} className={cx('sidebar')} ref={sidebarRef}>
          {thisIsDrawer()}
        </Col>
        <Col span={24 - SidebarWidth} className={cx('main-content')}>
          <div className={cx('inside-content')}>
            <img className={cx('banner')} src="https://i.ytimg.com/vi/hk0GZ9Whb4Y/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAvZbWBiWiwjIYEAqr7N_hZBrOA6Q"/>
            <div className={cx('below-content')}>
              <div className={cx('top-side')}>
                <div className={cx('left-housing')}>
                  <img src="https://yt3.googleusercontent.com/wj40B2uwyIAvPiiOqnCZ59VH6loSOmrRYA2jBrRYQM4bKjV523W9vlVZAe1MNnMu2-UIWQ7Sug=s176-c-k-c0x00ffffff-no-rj" className={cx('avatar')} />
                  <div className={cx('data')}>
                    <div><p className={cx('name')}>channel's name</p></div>
                    <div style={{display: "flex"}}>
                      <p className={cx('infomation')}>@tagName</p>
                      <p className={cx('infomation')}>Sub count</p>
                      <p className={cx('infomation')}>Video count</p>
                    </div>
                    <div><p className={cx('description')}>channel's des</p></div>
                  </div>
                </div>
                <div className={cx('right-housing')}>
                  <button className={cx('submit-button')}>button 1</button>
                  <button className={cx('submit-button')}>button 2</button>
                </div>
              </div>

              <div className={cx('tab-selector')}>
                tab selector
              </div>

              <div>
                below content
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default memo(Channel);

