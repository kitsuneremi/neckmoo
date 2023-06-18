import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const params = {
        link: url.searchParams.get("link") || ""
    }
    const video = await prisma.videos.findFirst({
        where: {
            link: params.link
        }
    })
    const comment = await prisma.comments.count({
        where: {
            videoId: video.id
        }
    })
    const videoWithCommentCount = { ...video, comment: comment }
    return new Response(JSON.stringify(videoWithCommentCount));
}