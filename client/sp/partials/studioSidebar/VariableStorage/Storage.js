import { useState, useReducer } from "react";
import Context from './Context'

function VariableProvider({ children }) {
    const [videoFile, setVideoFile] = useState()
    const [avatarFile, setAvatarFile] = useState()
    const [videoFileLink, setVideoFileLink] = useState()
    const [avatarFileLink, setAvatarFileLink] = useState()
    const [step1, setStep1] = useState()
    const [step2, setStep2] = useState()
    const [step3, setStep3] = useState()
    const [finalLink, setFinalLink] = useState()
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [imgType, setImgType] = useState('')
    const [videoType, setVideoType] = useState('')

    const value = {
        'videoFile': videoFile,
        'avatarFile': avatarFile,
        'videoLink': videoFileLink,
        'avatarLink': avatarFileLink,
        'step1': step1,
        'step2': step2,
        'step3': step3,
        'finalLink': finalLink,
        title,
        des,
        imgType,
        videoType,
        setVideoFile,
        setAvatarFile,
        setVideoFileLink,
        setAvatarFileLink,
        setStep1,
        setStep2,
        setStep3,
        setFinalLink,
        setTitle,
        setDes,
        setImgType,
        setVideoType
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default VariableProvider
