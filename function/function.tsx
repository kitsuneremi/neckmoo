export function ReduceString({ string, maxLength }: { string: string, maxLength: number }) {
    if (string.length > maxLength) {
        return string.substring(0, maxLength) + '...'
    } else {
        return string
    }
}


export function FormatDateTime(dateTime: Date) {
    const currentTime: any = new Date();
    const inputTime: any = new Date(dateTime);

    const timeDiff: any = Math.abs(currentTime - inputTime); // Độ chênh lệch thời gian

    // Đổi milliseconds thành phút
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    if (minutesDiff < 1) {
        return "Vừa xong";
    } else if (minutesDiff < 60) {
        return minutesDiff + " phút trước";
    } else if (minutesDiff < 1440) {
        const hoursDiff = Math.floor(minutesDiff / 60);
        return hoursDiff + " giờ trước";
    } else if (minutesDiff < 43200) {
        const daysDiff = Math.floor(minutesDiff / 1440);
        return daysDiff + " ngày trước";
    } else if (minutesDiff < 525600) {
        const monthsDiff = Math.floor(minutesDiff / 43200);
        return monthsDiff + " tháng trước";
    } else {
        const yearsDiff = Math.floor(minutesDiff / 525600);
        return yearsDiff + " năm trước";
    }
}


export const baseURL = process.env.NODE_ENV === 'production' ? 'https://erinsaiyukii.com' : 'http://localhost:3000'