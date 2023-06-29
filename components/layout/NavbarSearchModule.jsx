import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from "react"
import { CloseOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import classNames from "classnames/bind"
import styles from '@/styles/component/navbar.module.scss'
import axios from "axios"

const cx = classNames.bind(styles)

const NavbarSearchModule = () => {
    const [searchData, setSearchData] = useState([])
    const [showClear, setShowClear] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const searchDropdownRef = useRef(null)
    const searchInputRef = useRef(null)
    const router = useRouter()


    useEffect(() => {
        if (searchValue.trim() === '') {
            setShowSearchResult(false)
            setShowClear(false)
        } else {
            setShowSearchResult(true)
            setShowLoading(true)
            setShowClear(true)
            axios.get('/api/video/containkey', {
                params: {
                    keyword: searchValue
                }
            })
                .then(res => { setSearchData(res.data); setShowLoading(false) })
        }
    }, [searchValue])

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (searchDropdownRef.current != null) {
                if (
                    !searchDropdownRef.current.contains(event.target) &&
                    !searchInputRef.current.contains(event.target)
                ) {
                    setShowSearchResult(false);
                }
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleSearch = () => {
        setShowSearchResult(false)
        if (searchValue !== '') {
            router.push(`/result/${encodeURIComponent(searchValue)}`)
        }
    }

    const handleInputFocus = () => {
        setShowSearchResult(true);
    };

    // const handleInputBlur = () => {
    //     // Sử dụng setTimeout để kiểm tra xem người dùng có bấm vào phần danh sách không.
    //     // Nếu bấm vào, không thay đổi trạng thái showSearchResult, ngược lại, ẩn danh sách.
    //     setTimeout(() => {
    //         if (searchDropdownRef.current != null) {
    //             if (!searchDropdownRef.current.contains(document.activeElement)) {
    //                 setShowSearchResult(false);
    //             }
    //         }
    //     }, 0);
    // };


    return (
        <div className={cx('search-box')}>
            <div className={cx('search')}>
                <input
                    className={cx('input')}
                    ref={searchInputRef}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={handleInputFocus}
                // onBlur={handleInputBlur}
                />
                {showClear && !showLoading && (
                    <button className={cx('clear')} onClick={() => setSearchValue('')}>
                        <CloseOutlined />
                    </button>
                )}
                {showLoading && <LoadingOutlined className={cx('spinner')} />}
                <SearchOutlined onClick={handleSearch} className={cx('search-button')} />
            </div>
            {showSearchResult && (
                <ul ref={searchDropdownRef} className={cx('search-result')}>
                    {searchData != null ? (
                        searchData.map((data, index) => {
                            return (
                                <li key={index} className={cx('result')} onClick={() => { router.push(`/result/${data.title}`) }}>
                                    <div>{data.title}</div>
                                </li>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </ul>
            )}
        </div>
    );
};

export default NavbarSearchModule