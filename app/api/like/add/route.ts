import prisma from "@/lib/prisma";

interface RequestBody {
    accountId: number;
    targetId: number;
    type: number
}

export async function POST(request: Request) {
    const data: RequestBody = await request.json();
    const like = await prisma.likes.create(
        {
            data: {
                accountId: data.accountId,
                videoId: data.targetId,
                type: data.type
            }
        }
    )
    return new Response(JSON.stringify(like))
}