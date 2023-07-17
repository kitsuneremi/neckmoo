"use client";
import { useState, useEffect, useRef } from "react"
import { CommentOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons'
import axios from "axios"
import io from 'socket.io-client'
import clsx from 'clsx';
import classNames from "classnames/bind";
import styles from '@/styles/component/chatModule.module.scss'

const cx = classNames.bind(styles)

export default function Chat({ session }) {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [open, setOpen] = useState(true);
    const [msg, setMsg] = useState("");
    const [room, setRoom] = useState(-1)
    const [listMsg, setListMsg] = useState([])
    const [list, setList] = useState([])
    const [anyChange, setChange] = useState(false)
    const socketRef = useRef(null);
    useEffect(() => {
        socketRef.current = io.connect('http://localhost:6075');
        // socketRef.current = io.connect('https://socket.erinasaiyukii.com');
        return () => {
            socketRef.current.disconnect();
        };
    }, [])

    useEffect(() => {
        axios.get('/api/account').then(res => { setList(res.data) })
    }, [])

    useEffect(() => {
        if (socketRef.current !== undefined && socketRef.current != null) {
            socketRef.current.on('rcvmsg', data => {
                setChange(true)
            })
        }
    }, [])


    useEffect(() => {
        if (anyChange) {
            axios.get('/api/message', {
                params: {
                    room: room
                }
            }).then(res => { setListMsg(res.data); setChange(false) })
        }
    }, [anyChange])



    useEffect(() => {
        axios.get('/api/message', {
            params: {
                room: room
            }
        }).then(res => { setListMsg(res.data); setChange(false) })
    }, [room])

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            // menu.style.left = `-400px`;
            menu.style.right = '0px'
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    const handleSend = () => {
        if (room != -1) {
            const data = {
                room: room,
                accountId: session.user.id,
                content: msg
            }
            axios.post('/api/message', data).then(() => setChange(true)).then(() => { socketRef.current.emit('sendmsg', data) })
        }
    }

    const handleJoin = ({ targetId }) => {
        if (session.user.id != null && session.user.id != undefined) {
            axios.post('/api/room', {
                name: session.user.name,
                accountId: session.user.id,
                targetId: targetId
            }).then(res => {
                setRoom(res.data.id);
                socketRef.current.emit('join', {
                    id: targetId,
                    room: res.data.id
                })
            })
        }

    }

    const render = () => {
        if (list.length > 0) {
            return (
                list.map((item, index) => {
                    return (
                        <div className={cx('box')} key={index} onClick={() => { handleJoin({ targetId: item.id }) }}>
                            <p className={cx('name')}>{item.name}</p>
                        </div>
                    )
                })
            )
        } else {
            return (<div>nothing here</div>)
        }

    }

    const renderMsg = () => {
        return listMsg.map((msg, index) => {

            const flex = msg.member.accountId == session.user.id

            return (
                <div key={index} className={clsx({ [cx('end')]: flex }, { [cx('start')]: !flex })}>
                    <div className={clsx({ [cx('msg-box-self')]: flex }, { [cx('msg-box-another')]: !flex })}>
                        <p>{msg.content}</p>
                    </div>
                </div>
            )
        })
    }

    const handleUpdateInput = (e) => {
        setMsg(e.target.value);
    }


    return (
        <button className={cx('button')}>
            <div className={cx('chat-box')}>
                <div ref={buttonRef} onClick={() => { setShow(!show) }}>
                    <CommentOutlined />
                </div>

                {show ? <div className={cx('dropdown')} ref={menuRef}>
                    <div className={cx('top')}>
                        <UnorderedListOutlined onClick={() => { setOpen(!open) }} />
                        <div>
                            <p></p>
                        </div>
                        <SettingOutlined />
                    </div>
                    <div className={cx('bottom')}>
                        <div className={clsx({ [cx('left')]: open }, { [cx('left-hide')]: !open })}>
                            <div className={cx('top')}>
                                {render()}
                            </div>
                            <div className={cx('bottom')}>

                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('top')}>
                                <div>
                                    {renderMsg()}
                                </div>
                            </div>
                            <div className={cx('bottom')}>
                                <input className={cx('input')} value={msg} onChange={e => handleUpdateInput(e)} />
                                <button className={cx('send-button')} onClick={handleSend}>send</button>
                            </div>
                        </div>
                    </div>
                </div> : <></>}
            </div>
        </button>
    )
}