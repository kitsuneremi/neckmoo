import { memo, useState, useContext, useEffect } from 'react'
import { Button, message, Steps, theme } from 'antd'
import Step1 from './inside/Step1'
import Step2 from './inside/Step2'
import Step3 from './inside/Step3'
import UploadStorage from '../VariableStorage/Context'
const steps = [
    {
        title: 'lựa chọn video',
        content: <Step1 />,
    },
    {
        title: 'hoàn thiện nội dung',
        content: <Step2 />,
    },
    {
        title: 'hoàn tất',
        content: <Step3 />,
    },
];
//   
const Upload = () => {
    const context = useContext(UploadStorage);

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [nextStep, setNextStep] = useState(true);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    useEffect(() => {
        if (context.videoFile == null) {
            setNextStep(true)
        } else {
            setNextStep(false)
        }
    }, [context.videoFile])

    useEffect(() => {
        if (context.avatarFile == null) {
            setNextStep(true)
        } else {
            setNextStep(false)
        }
    }, [context.avatarFile])

    return (
        <div style={{ padding: '1% 2%' }}>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => {next();setNextStep(false)}} disabled={nextStep}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </div>
    )
}

export default memo(Upload)