import styles from '@/styles/layout/pcSettingLayout.module.scss'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { useIsomorphicLayoutEffect, useMediaQuery } from 'usehooks-ts'
import { useAppSelector, AppDispatch } from '@/redux/storage';
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles)

type propsType = {
    title: string,
    href: string
}

const listSettings: propsType[] = [
    {
        title: 'Tài khoản',
        href: '/setting/account'
    }, {
        title: 'Thông báo',
        href: '/setting/notification'
    },
    {
        title: 'Chức năng phát và hiệu suất',
        href: '/setting/playback'
    },
    {
        title: 'Nội dung tải xuống',
        href: '/setting/download'
    },
    {
        title: 'Quyền riêng tư',
        href: '/setting/privacy'
    }, {
        title: 'Cài đặt nâng cao',
        href: '/setting/advance'
    }
]

export default function PcSetiingLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }

    useIsomorphicLayoutEffect(() => {
        if (deviceType.isMobile || deviceType.isTablet) {
            router.push('/setting')
        }else{
            router.push('/setting/account')
        }
    }, [deviceType])


    return (
        <>
            <aside className={cx('left')}>
                {
                    listSettings.map((item, index) => {
                        return (
                            <Link href={item.href} key={index}>
                                <div className={cx('item-box')}>
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </aside>
            <aside className={cx('right')}>
                {children}
            </aside>
        </>
    )
}