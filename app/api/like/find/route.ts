import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
        accountId: parseInt(url.searchParams.get("accountId") || ""),
        targetId: parseInt(url.searchParams.get("targetId") || "")
    };
    const like = await prisma.likes.findFirst({
        where: {
            accountId: params.accountId,
            videoId: params.targetId
        }
    })
    if (like == null) {
        return new Response(JSON.stringify(null), { status: 200 })
    } else {
        return new Response(JSON.stringify(like), { status: 200 })
    }
}