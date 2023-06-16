import prisma from "@/lib/prisma";

interface RequestBody{
    videoId: string;
    link: string;
}

export async function POST(request: Request) {
    const body:RequestBody = await request.json();
    const video = await prisma.videos.findFirst({
        where: {
            link: body.link
        }
    })

    const updated = await prisma.videos.update({where: { id: video.id}, data: {
        view: video.view + 1
    }})

    return new Response(JSON.stringify(updated))
}

