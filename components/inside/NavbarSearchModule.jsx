import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef} from "react"
import { CloseOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import classNames from "classnames/bind"
import styles from '@/styles/navbar.module.scss'
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
            axios.get(`/api/video/containkey?keyword=${searchValue}`, {
                params: {}
            })
                .then(res => { setSearchData(res.data); setShowLoading(false) })
        }
    }, [searchValue])

    const handleSearch = () => {
        setShowSearchResult(false)
        if (searchValue !== '') {
            router.push(`/result/${encodeURIComponent(searchValue)}`)
        }
    }

    return (
        <div className={cx('search-box')} onFocus={() => { setShowSearchResult(true) }} onBlur={() => { setShowSearchResult(false) }}>
            <div className={cx('search')}>
                <input className={cx('input')} ref={searchInputRef} value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                {showClear && !showLoading && <button className={cx('clear')} onClick={() => { setSearchValue('') }}>
                    <CloseOutlined />
                </button>}
                {showLoading && <LoadingOutlined className={cx('spinner')} />}
                <SearchOutlined onClick={() => { handleSearch() }} className={cx('search-button')} />
            </div>
            {showSearchResult && <ul ref={searchDropdownRef} className={cx('search-result')}>
                {searchData != null ? searchData.map((data, index) => {
                    return <li key={index} className={cx('result')}>{data.title}</li>
                }) : <></>}
            </ul>}
        </div>
    )
}


export default NavbarSearchModule