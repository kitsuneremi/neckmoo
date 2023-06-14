import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
        link: url.searchParams.get("link") || ""
    }
    const video = await prisma.videos.findFirst({
        where: {
            link: params.link
        }
    })
    if(video.id){
        const channel = await prisma.channels.findFirst({
            where: {
                id: video.channelId
            }
        })
        const sub = await prisma.subcribes.count({
            where: {
                channelId: channel.id
            }
        })
        const channelWithSubcount = {...channel, sub: sub}
        return new Response(JSON.stringify(channelWithSubcount));
    }else{
        return new Response(JSON.stringify(null));
    }


}