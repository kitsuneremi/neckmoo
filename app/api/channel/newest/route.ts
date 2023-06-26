import prisma from "@/lib/prisma"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const params = {
        tagName: url.searchParams.get('tagName') || ""
    }
    const channel = await prisma.channels.findFirst(
        {
            where: {
                tagName: params.tagName
            }
        }
    )
    if (channel == null) {
        return new Response(JSON.stringify(null))
    }
    const list = await prisma.videos.findMany({
        where: {
            channelId: channel.accountId
        }, orderBy: {
            createdAt: 'desc'
        }
    })
    return new Response(JSON.stringify(list), { status: 200 })
}