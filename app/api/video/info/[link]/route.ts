import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const id = request.url.split('/')[6];
    const video = await prisma.videos.findFirst({
        where: {
            link: id
        }
    })
    const comment = await prisma.comment.count({
        where: {
            videoId: video.id
        }
    })
    const videoWithCommentCount = {...video, comment: comment}
    return new Response(JSON.stringify(videoWithCommentCount));
}