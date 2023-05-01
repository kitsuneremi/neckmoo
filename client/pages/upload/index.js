import { Fragment, memo } from 'react'
import Navbar from '../../partials/studioNavbar/Nav';
import Sidebar from '../../partials/studioSidebar/StudioSide';
import { Col, Row } from 'antd';
const Up = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Sidebar></Sidebar>
            </div>
        </>
    );
}

export default memo(Up)