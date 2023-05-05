import { useState, useEffect, useRef, useContext, memo } from "react"
import { Space, Row, Col, Drawer } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import axios from "axios";
import classNames from "classnames/bind";
import clsx from "clsx";
import Context from '@/GlobalVariableStorage/Context'
import Item from '@/sp/partials/sidebar/SideBarItem';
import style from '@/styles/Channel.module.scss'
import Navx from "@/sp/partials/navbar/Nav";
import Feature from "@/sp/inside/Feature";
import Videos from "@/sp/inside/Videos";

export async function getServerSideProps({params}){
  const slug = params.slug
  try {
    const [channelRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/channel/basicdata/${slug}`)
    ]);

    return {
        props: {
            channelData: channelRes.data,
        }
    };
} catch (error) {
    return {
        props: {
            error: error.message
        }
    };
}
}

function Channel({channelData}) {
  const router = useRouter()
  const cx = classNames.bind(style)
  //useContext
  const context = useContext(Context)

  //useRef
  const sidebarRef = useRef()

  //useState
  const [needDrawer, setNeedDrawer] = useState(false)
  const [SidebarWidth, setSidebarWidth] = useState(2)
  const [selectedTab, setSelectedTab] = useState(0)
  const [listVideo, setListVideo] = useState([])
  // const [channelData, setChannelData] = useState({})
  const [subcribed, setSubcribed] = useState(false)

  //useEffect
  useEffect(() => {
    context.sidebarstatus ? setSidebarWidth(3) : setSidebarWidth(2)
  }, [context.sidebarstatus])

  useEffect(() => {

  },[selectedTab])

  useEffect(() => {
    if (context.drawerstatus && needDrawer) {
      setSidebarWidth(2)
    }
  }, [context.drawerstatus])

  useEffect(() => {
    axios.get('http://localhost:5000/api/video')
      .then(res => { setListVideo(res.data) })
  }, [])

  // useEffect(() => {
  //   if(!router.query.slug) return 
  //   axios.get(`http://localhost:5000/api/channel/basicdata/${router.query.slug}`)
  //   .then(res => { setChannelData(res.data)})
  // },[router.query.slug])

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

  const tabSelector = () =>{
    const tabs = [
      {
        'index': 0,
        'title': 'TRANG CHỦ'
      },
      {
        'index': 1,
        'title': 'VIDEO'
      },
      {
        'index': 2,
        'title': 'DANH SÁCH PHÁT'
      },
      {
        'index': 3,
        'title': 'CỘNG ĐỒNG'
      },
      {
        'index': 4,
        'title': 'KÊNH'
      },
      {
        'index': 5,
        'title': 'GIỚI THIỆU'
      }
    ]
    return (
      <div className={cx('tab-selector')}>
        {tabs.map((tab, index) => {
          return <button key={index} className={clsx({[cx('selected-tab')]: selectedTab === index}, {[cx('tab')]: selectedTab !== index})} onClick={() => {setSelectedTab(index)}}>{tab.title}</button>
        })}
      </div>
    )
  }

  const contentRender = () => {
    if(selectedTab === 0){
      return(
        <Feature></Feature>
      )
    }else{
      return (
        <Videos></Videos>
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
          <div className={cx('inside-content')}>
            <img className={cx('banner')} src="https://yt3.googleusercontent.com/Kkc1bslkkgUcoPj6wK9A-zMynoL91g5vk2nU1V79LVZEV_6pEa_0iuwMtIVJSR7RQPN8sjFIzw=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"/>
            <div className={cx('below-content')}>
              <div className={cx('top-side')}>
                <div className={cx('left-housing')}>
                  <img src="https://yt3.googleusercontent.com/wj40B2uwyIAvPiiOqnCZ59VH6loSOmrRYA2jBrRYQM4bKjV523W9vlVZAe1MNnMu2-UIWQ7Sug=s176-c-k-c0x00ffffff-no-rj" className={cx('avatar')} />
                  <div className={cx('data')}>
                    <div><p className={cx('name')}>{channelData.name}</p></div>
                    <div style={{display: "flex"}}>
                      <p className={cx('infomation')}>{channelData.tagName}</p>
                      <p className={cx('infomation')}>Sub count</p>
                      <p className={cx('infomation')}>{listVideo ? `${listVideo.length} Video` : 0}</p>
                    </div>
                    <div><p className={cx('description')}>{channelData.des}</p></div>
                  </div>
                </div>
                <div className={cx('right-housing')}>
                  <button className={clsx({[cx('subcribe-button')]: !subcribed}, {[cx('unsubcribe-button')]: subcribed})} onClick={() => {setSubcribed(!subcribed)}}>{subcribed ? 'đã đăng ký' : 'đăng ký'}</button>
                </div>
              </div>

              <div className={cx('tab-selector')}>
                {tabSelector()}
              </div>
              <div>
                {contentRender()}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default memo(Channel);

