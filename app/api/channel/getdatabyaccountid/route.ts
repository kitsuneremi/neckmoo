import prisma from "@/lib/prisma";


export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = {
        accountId: parseInt(url.searchParams.get("accountId") || "")
    }
    const channel = await prisma.channels.findFirst({
        where: { accountId: params.accountId }
    })
    return new Response(JSON.stringify(channel));
}
