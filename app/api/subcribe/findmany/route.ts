import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
        accountId: parseInt(url.searchParams.get("accountId") || "")
    };
    const list = await prisma.subcribes.findMany({
        where: {
            accountId: params.accountId
        }
    })

    if (list == null) {
        return new Response(JSON.stringify(null), {
            status: 200
        });
    } else {
        const wait = new Promise((resolve, reject) => {
            const listChannelData = [];
            const promises = list.map(async (item) => {
                const channelData = await prisma.channels.findFirst({
                    where: {
                        id: item.channelId
                    }
                });
                listChannelData.push(channelData);
            });

            Promise.all(promises)
                .then(() => {
                    resolve(listChannelData);
                }) 
                .catch((error) => {
                    reject(error);
                });
        });

        return wait.then((res) => {
            return new Response(JSON.stringify(res), {
                status: 200
            });
        }).catch((error) => {
            return new Response(JSON.stringify(error), {
                status: 500
            });
        });
    }
}