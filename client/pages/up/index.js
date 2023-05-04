import { memo } from 'react'
import Navbar from '../../sp/partials/studioNavbar/Nav';
import Sidebar from '../../sp/partials/studioSidebar/StudioSide';
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