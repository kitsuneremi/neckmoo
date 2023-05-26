import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const video = await prisma.videos.findFirst({
        where: {
            link: decodeURIComponent(request.url.split('/')[6])
        }
    })
    if(video.id){
        const channel = await prisma.channels.findFirst({
            where: {
                id: video.channelId
            }
        })
        return new Response(JSON.stringify(channel));
    }else{
        return new Response(JSON.stringify(null));
    }


}