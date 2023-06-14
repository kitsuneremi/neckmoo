import prisma from "@/lib/prisma";



export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
        tagName: url.searchParams.get("tagName") || ""
    }
    const channel = await prisma.channels.findFirst({
        where: {
            tagName: params.tagName
        }
    })
    if (channel != null) {
        const sub = await prisma.subcribes.count({
            where: {
                channelId: channel.id
            }
        })

        const videoCount = await prisma.videos.count({
            where: {
                channelId: channel.id
            }
        })
        const channelWithSubcount = { ...channel, sub: sub, video: videoCount }
        return new Response(JSON.stringify(channelWithSubcount));
    }
    return new Response(JSON.stringify(null));

}