import prisma from "@/lib/prisma";

export async function GET(request: Request){ 
    const id = request.url.split('/')[6];
    const video = await prisma.videos.findFirst({
        where: {
            link: id
        }
    })

    return new Response(JSON.stringify(video));
}