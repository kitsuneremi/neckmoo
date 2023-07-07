import style from "@/styles/watch/watch.module.scss";
import axios from "axios";
import classNames from "classnames/bind";
import Render from '@/components/watch/Render'

const cx = classNames.bind(style);

export async function generateMetadata({ params }) {
    const link = params.link;

    try {
        const response = await fetch(`https://erinasaiyukii.com/api/video/findbylink?link=${link}`);
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu');
        }

        const data = await response.json();
        return {
            title: `${data.title}`
        };
    } catch (error) {
        console.error(error);
        return {
            title: 'not found???'
        };
    }
}

export default async function Watch({ params }) {

    return (
        <>
            <main className={cx("window")}>
                <Render link={params.link} />
            </main>
        </>
    );
}