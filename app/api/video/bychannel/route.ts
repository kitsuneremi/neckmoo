import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
        channelId: url.searchParams.get("channelId") || "",
        tagName: url.searchParams.get("tagName") || "",
    }


    if (params.channelId !== "") {
        let list = await prisma.videos.findMany({
            where: {
                channelId: Number.parseInt(params.channelId)
            }
        })
        return new Response(JSON.stringify(list))
    } else {
        let channel = await prisma.channels.findFirst({
            where: {
                tagName: params.tagName
            }
        })

        let list = await prisma.videos.findMany({
            where: {
                channelId: channel.id
            }
        })
        return new Response(JSON.stringify(list))
    }



}