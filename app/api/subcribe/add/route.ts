import prisma from "@/lib/prisma";

interface RequestBody {
    accountId: number,
    targetChannel: number,
}

export async function POST(request: Request) {
    const data: RequestBody = await request.json();
    const sub = await prisma.subcribes.create({
        data: {
            accountId: data.accountId,
            channelId: data.targetChannel
        }
    })

    if (sub != null) {
        return new Response(JSON.stringify(sub), { status: 200 })
    } else {
        return new Response(JSON.stringify(null), { status: 418 })
    }
}

