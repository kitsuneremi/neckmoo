import {Nav, NavItem, Navbar } from "react-bootstrap"
import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo, useReducer, useContext, memo } from "react"
import {Space, Row, Col, Drawer } from "antd";
import { UnorderedListOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Link } from "react-router-dom";
import Item from '../../partials/sidebar/SideBarItem';
import VideoItem from '../home/inside/VideoItem';
import Context from '../../../../GlobalVariableStorage/Context'
import style from '../../../styles/Result.module.scss';
import Navx from "../../partials/navbar/Nav";
function Result() {
    //useContext
    const context = useContext(Context)

    //useRef
    const sidebarRef = useRef()

    //useState
    const [needDrawer, setNeedDrawer] = useState(false)
    const [SidebarWidth, setSidebarWidth] = useState(2)
    const [drawerWidth,setDrawerWidth] = useState(200)
    const [searchValue, setSearchValue] = useState('')


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

    //sẵn cho việc render lại cái dropdown
    useEffect(() => {

    }, [searchValue])

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

    //useCallback

    //useReducer

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
                        width={drawerWidth}
                        onClose={() => {
                            context.setFalseShowDrawer();
                            context.setFlagDetailSidebar()
                        }}
                        open={context.drawerstatus}
                        extra={
                            <Space>
                                <CloseOutlined  onClick={() => {context.setFalseShowDrawer();context.setFlagDetailSidebar()}}/>
                            </Space>
                        }
                    >
                        <Item show = {true}></Item>
                    </Drawer>;
                }
            } else {
                return (
                    <Item show = {true}></Item>
                )
            }
        } else {
            return (
                <Item show = {false}></Item>
            )
        }
    }

    return (
        <div className="App">
            <Navx />

            <Row style={{ width: "fit-content" }}>
                <Col span={SidebarWidth} className={`${style.sidebar}`} ref={sidebarRef}>
                    {thisIsDrawer()}
                </Col>
                <Col span={24 - SidebarWidth} className={style.mainContent}>
                    <Row className={style.insideContent}>
                        <VideoItem ></VideoItem>
                        <VideoItem ></VideoItem>
                        <VideoItem ></VideoItem>
                        <VideoItem ></VideoItem>
                        <VideoItem ></VideoItem>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default Result;

