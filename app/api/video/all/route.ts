import prisma from "@/lib/prisma";

export async function GET() {
    const video = await prisma.videos.findMany();
    const wait = new Promise((resolve, reject) => {
        const list = [];
        const promises = video.map(async (item) => {
            const channelData = await prisma.channels.findFirst({
                where: {
                    id: item.channelId
                }
            });

            const middle = { videoData: { ...item }, channelData: channelData }
            list.push(middle);
        });
        Promise.all(promises)
            .then(() => {
                resolve(list);
            })
            .catch((error) => {
                reject(error);
            });
    })
    return wait.then((res) => {
        return new Response(JSON.stringify(res));
    }).catch((error) => {
        return new Response(JSON.stringify(error));
    });
}