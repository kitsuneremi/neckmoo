'use client'
import styles from '@/styles/layout/defaultLayout.module.scss'
import classNames from "classnames/bind"
import Navbar from "@/components/layout/Navbar"
import Protector from '@/lib/protector'
import MainStudioLayout from '@/layout/mainStudioLayout'
import { AppDispatch, useAppSelector } from '@/redux/storage';
import { useDispatch } from 'react-redux'
import { close, reverse, open } from '@/redux/features/sidebar-slice';
import { useMediaQuery } from 'usehooks-ts'

const cx = classNames.bind(styles)
export default function StudioLayout({ children }) {
    const dispatch = useDispatch()
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }
    if (deviceType.isPc) {
        dispatch(open())
    } else {
        dispatch(close())
    }
    return (
        <Protector>
            <div className={cx('navbar')}>
                <Navbar></Navbar>
            </div>
            <MainStudioLayout>
                {children}
            </MainStudioLayout>
        </Protector>
    )
}