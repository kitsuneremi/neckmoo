import styles from '@/styles/upload.module.scss'
import classNames from 'classnames/bind'
export default function UploadPage() {
    const cx = classNames.bind(styles)
    return (
        <div className={cx('box')}>
            <div className={cx('left-housing')}>
                <p>tải video lên</p>
                <div className={cx('video-upload-box')}>
                    <div className={cx('uploader-box')}>
                        <label htmlFor='file-upload' className={cx('inside-uploader')}>+</label>
                        <input type='file' id='file-upload' className={cx('file-upload')}></input>
                    </div>

                    <div className={cx('video-infomation-box')}>
                        <p className={cx('text')}>tên file</p>
                        <p className={cx('text')}>định dạng</p>
                        <p className={cx('text')}>kích thước</p>
                        <p className={cx('text')}>độ dài</p>
                    </div>
                </div>
                <div className={cx('video-detail-box')}>
                    <p className={cx('title')}>tiêu đề</p>
                    <input className={cx('input')}></input>
                    <p className={cx('title')}>mô tả</p>
                    <textarea className={cx('description')}></textarea>
                </div>
                <div className={cx('video-mode-box')}>
                    <input type='radio' name='mode' value={0} defaultChecked={true} />
                    <p className={cx('p')}>công khai</p>
                    <input type='radio' name='mode' value={1} />
                    <p className={cx('p')}>không công khai</p>
                    <input type='radio' name='mode' value={2} />
                    <p className={cx('p')}>riêng tư</p>

                </div>
                <button className={cx('finish-form-button')}>hoàn thành</button>
            </div>
            <div className={cx('right-housing')}>
                <video src='' className={cx('video')}>

                </video>
                <div className={cx('video-link-box')}>
                    <p className={cx('name')}>
                        đường dẫn video:
                    </p>
                </div>
                <div className={cx('thumbnail-upload-box')}>
                    <div className={cx('uploader-box')}>
                        <label htmlFor='thumbnail-upload' className={cx('inside-uploader')}>+</label>
                        <input type='file' id='thumbnail-upload' className={cx('file-upload')}></input>
                    </div>
                    <img src='' className={cx('thumbnail-preview')}></img>
                </div>
            </div>
        </div>
    )
}