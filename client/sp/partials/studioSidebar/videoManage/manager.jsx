import { useEffect, useState, useContext } from "react"
import style from '../../../../styles/StudioManager.module.scss'
import classNames from "classnames/bind";
import clsx from 'clsx'
import axios from 'axios'
const Manager = () => {
    const cx = classNames.bind(style)
    //useState 
    const [showOptionMenu, setShowOptionMenu] = useState(false);
    const [listVideo, setListVideo] = useState([]);
    const [showSubOption, setShowSubOption] = useState(null)
    const [selectedTab, setSelectedTab] = useState(0)
    const [videoChecked, setVideoChecked] = useState(false)

    useEffect(() => {
        const getListVideo = async () => {
            let f = new FormData();
            f.append('username', localStorage.getItem('username'));

            try {
                const res = await axios.post('http://localhost:5000/api/studio/getlistvideo', f);
                const x = await Promise.all(res.data.map(async (vid, index) => {
                    vid.checked = false;
                    vid.index = index;
                    const thumbnailRes = await axios.get(`http://localhost:5000/api/file/image/${vid.link}`, { responseType: 'blob' });
                    const binaryData = [thumbnailRes.data];
                    vid.thumbnail = window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" }));
                    return vid;
                }));
                setListVideo(x);
            } catch (error) {
                console.error(error);
            }
        };

        getListVideo();
    }, []);

    useEffect(() => {},[listVideo])

    const listButton = [
        {
            title: 'video'
        },
        {
            title: 'trực tiếp'
        },
        {
            title: 'bài đăng'
        },
        {
            title: 'danh sách phát'
        },
        {
            title: 'postcad'
        },
    ]
    const Tabbutton = () => {
        return (
            <div className={cx('tab-box')}>
                {listButton.map((btn, index) => {
                    return <button key={index} className={
                        clsx({ [cx('tab-button')]: (selectedTab !== index) }, { [cx('selected-tab-button')]: (selectedTab === index) })
                    } onClick={() => { setSelectedTab(index) }}>{btn.title}</button>
                })}
            </div>
        )
    }

    const TabRender = () => {
        if (selectedTab === 0) {
            return <table>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={e => { }} /></td>
                        <th>Video</th>
                        <th>Chế độ hiển thị</th>
                        <th>Hạn chế</th>
                        <th>Ngày</th>
                        <th>Số lượt xem</th>
                        <th>Số bình luận</th>
                        <th>Lượt thích(%)</th>
                    </tr>
                </thead>
                <tbody className={cx('table-body')}>
                    {listVideo !== [] ? listVideo.map((video, index) => {
                        return <tr key={index} onMouseEnter={() => { setShowSubOption(index) }} className={cx('item')}>
                            <td>
                                <input type="checkbox"
                                    checked = {videoChecked}
                                    onChange={(e) => {
                                        setVideoChecked(e.target.checked);
                                    }} />
                            </td>
                            <td>
                                <img src={video.thumbnail} alt="img" className={cx('thumbnail')} />
                            </td>
                            <td>
                                <div>{video.title}</div>
                                {showSubOption === index ? <div>focused</div> : <div>{video.des}</div>}
                            </td>
                            <td>
                                {video.status === 0 ? 'công khai' : 'không công khai'}
                            </td>
                            <td>
                                không có
                            </td>
                            <td>
                                {video.view}
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td><button>chỉnh sửa</button></td>
                        </tr>
                    }) : <></>}
                </tbody>
            </table>
        } else {
            <h1>test</h1>
        }
    }


    return (
        <>
            <div><h2>Nội dung của tôi</h2></div>
            <div>{Tabbutton()}</div>
            {showOptionMenu && <div className={cx('select-menu')}>
                <div>
                    <p className={cx('ver-div')}>Đã chọn</p>
                    <button>chỉnh sửa</button>
                    <button>thêm vào danh sách phát</button>
                    <button>thao tác khác</button>
                </div>
                <button onClick={() => { setShowOptionMenu(false); }}>X</button>
            </div>}
            <div>
                {TabRender()}
            </div>
        </>
    )
}

export default Manager  