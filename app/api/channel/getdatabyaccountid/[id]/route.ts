import prisma from "@/lib/prisma";


export async function GET(req: Request) {
    const id: number = Number.parseInt(req.url.split('/')[6]);
    const channel = await prisma.channels.findFirst({
        where: { accountId: id }
    })
    return new Response(JSON.stringify(channel));
}
