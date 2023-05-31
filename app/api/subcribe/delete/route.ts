import prisma from "@/lib/prisma";

interface RequestBody {
    accountId: number,
    targetChannel: number,
}

export async function POST(request: Request) {
    const data: RequestBody = await request.json();
    const find = await prisma.subcribes.findFirst({
        where: {
            accountId: data.accountId,
            channelId: data.targetChannel
        }
    })
    if (find != null) {
        const sub = await prisma.subcribes.deleteMany(
            {
                where: {
                    accountId: data.accountId,
                    channelId: data.targetChannel
                }
            }
        )
    }
    return new Response(JSON.stringify(null), { status: 200 })
}

