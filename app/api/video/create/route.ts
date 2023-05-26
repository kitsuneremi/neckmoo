import prisma from "@/lib/prisma";

interface RequestBody {
    title: string;
    des: string;
    mode: number;
    link: string;
    channelId: number;
}

export async function POST(req: Request, res: Response) {
    const body: RequestBody = await req.json();
    const user = await prisma.videos.create({
        data: {
            title: body.title,
            des: body.des,
            view: 0,
            status: body.mode,
            link: body.link,
            channelId: body.channelId
        }
    });
    return new Response(JSON.stringify(user))
}