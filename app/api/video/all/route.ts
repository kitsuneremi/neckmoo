import prisma from "@/lib/prisma";

export async function GET(){
    const video = await prisma.videos.findMany();
    return new Response(JSON.stringify(video))
}