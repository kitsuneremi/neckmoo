import prisma from "@/lib/prisma";

interface RequestBody {
    accountId: number;
    videoId: number;
    referenceId: number;
    content: string;
    status: number;

}


export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const comment = await prisma.comments.create({
        data: {
            accountId: body.accountId,
            videoId: body.videoId,
            referenceId: body.referenceId,
            content: body.content,
            status: body.status
        }
    })
    let x = await prisma.comments.count({
        where: {
            videoId: body.videoId
        }
    })
    const commentWithCount = { ...comment, comment: x }
    return new Response(JSON.stringify(commentWithCount), { status: 200 })
}