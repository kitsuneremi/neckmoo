import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const channel = await prisma.channels.findFirst({
        where: {
            tagName: decodeURIComponent(request.url.split('/')[6])
        }
    })
    return new Response(JSON.stringify(channel))
}