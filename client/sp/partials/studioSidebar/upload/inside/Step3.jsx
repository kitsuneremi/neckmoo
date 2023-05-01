import { useContext } from "react";
import Context from '../../VariableStorage/Context'
import axios from "axios";
const Step3 = () => {
    const context = useContext(Context)

    const uploadTest = () => {
        const formData = new FormData();
        formData.append('channelId', 1);
        if(context.title.trim() !== ''){
            formData.append('title', context.title);
        }else{
            formData.append('title', context.videoFile.name);
        }

        formData.append('des', context.des);
        formData.append('view', 0);
        formData.append('status', 0);
        formData.append('link', context.finalLink);
        axios.post('http://localhost:5000/api/upload/testx',formData)
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }
    return (
        <>
            <button onClick={() => { uploadTest() }} style={{ height: '100px', width: '100px' }}>ok</button>
        </>
    )
}

export default Step3