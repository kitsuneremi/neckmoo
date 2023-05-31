import prisma from "@/lib/prisma"

export async function GET(request: Request) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword");
    if(keyword == null){
        return new Response(JSON.stringify(null));
    }
    const video = await prisma.videos.findMany({
        where: {
            title: {
                contains: keyword
            }
        }
    })
    return new Response(JSON.stringify(video))
}