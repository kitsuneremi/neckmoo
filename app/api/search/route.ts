import prisma from "@/lib/prisma";


type videoData = {
    id: number,
    title: string,
    des: string,
    view: number,
    status: number,
    link: string,
    fragmentMode: boolean,
    channelId: number,
    createdAt: Date,
    updatedAt: Date
}

type channelData = {
    id: number,
    name: string,
    tagName: string,
    des: string,
    accountId: number,
    createdAt: Date,
    updatedAt: Date
}

const channelQuery = async (params: { keyword: string }) => {
    const channels = await prisma.channels.findMany({
        where: {
            name: {
                contains: params.keyword
            }
        }
    })

    const subPromise = channels.map(channel => {
        return prisma.subcribes.count({
            where: {
                channelId: channel.id
            }
        })
    })

    const subResult = await Promise.all(subPromise)
    const newChannels = channels.map((channel, index) => {
        return {
            ...channel,
            subCount: subResult[index]
        }
    })

    return newChannels
}

const videosQuery = async (params: { keyword: string }) => {
    const videos = await prisma.videos.findMany({
        where: {
            title: {
                contains: params.keyword
            }
        }
    })

    // const viewPromise = videos.map(video => {
    //     return prisma.videos.count({where: {

    //     }})
    // })
    return videos
}


export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = {
        keyword: url.searchParams.get('keyword')
    }


    if (params.keyword != null) {

        // test thử fetch data song song
        const [channels, videos] = await Promise.all([channelQuery(params), videosQuery(params)])

        return new Response(JSON.stringify({ channels: channels, videos: videos }))
    }
}