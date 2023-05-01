import { useEffect, useState, useContext } from "react";
import axios from "axios";
import style from '../../../../../styles/StudioSidebarUploadStep1.module.scss'
import classNames from 'classnames/bind'
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Progress } from 'antd';
import Context from '../../VariableStorage/Context'
const {Dragger} = Upload
const Step1 = () => {
    const context = useContext(Context)
    const cx = classNames.bind(style)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if(context.videoFile){
            context.setStep1(true)
        }else{
            context.setStep1(false)
        }
    },[context.videoFile])

    const getFileExt = (fileName) => {
        return fileName.name.substring(fileName.name.lastIndexOf('.') + 1);
    }

    function makeid() {
        let length = 8
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleSubmit = async (info) => {
            const formData = new FormData();
            let t = makeid()
            await context.setFinalLink(t);
            formData.append('video', context.videoFile, t + '.' + getFileExt(context.videoFile));
            context.setVideoType(getFileExt(context.videoFile))
            try {
                axios.post('http://localhost:5000/api/upload/video', formData, {
                    onUploadProgress: function (progressEvent) {
                        setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                    }
                })
                    .then(res => { console.log('request done') })
            } catch (error) {
                console.error(error);
            }
    }

    const handleBeforeUpload = (file) => {
        context.setVideoFile(file)
        context.setVideoFileLink(URL.createObjectURL(file))
    }

    return (
        <div style={{height: '800px'}}>
            <Dragger
                style={{width: '100%'}}
                beforeUpload={(file) => { handleBeforeUpload(file) }}
                onChange={async (info) => { handleSubmit(info) }}
                progress={<Progress type="line" percent={progress} />}
                customRequest={() => {}}
                onRemove={() => {context.setVideoFile(null)}}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">lựa chọn video tải lên</p>
                <p className="ant-upload-hint">
                    kéo hoặc thả file video vào đây
                </p>
            </Dragger>
        </div>
    )

}

export default Step1