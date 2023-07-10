import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = {
        tagName: url.searchParams.get('tagName')
    }
    if (params.tagName != null) {
        const channel = await prisma.channels.findFirst({
            where: {
                tagName: params.tagName
            }
        })
        const subCount = await prisma.subcribes.count({
            where: {
                channelId: channel.id
            }
        })

        const videoCount = await prisma.videos.count({
            where: {
                channelId: channel.id
            }
        })

        return new Response(JSON.stringify({ ...channel, subcribeCount: subCount, videoCount: videoCount }))
    } else {
        return new Response(null, { status: 403 })
    }
}