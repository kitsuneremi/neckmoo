import prisma from "@/lib/prisma"

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = {
      videoId: parseInt(url.searchParams.get("videoId") || "")
    };
  
    const list = await prisma.comments.findMany({
      where: {
        videoId: params.videoId
      }
    });
  
    if (list.length > 0) {
      const newlist = await Promise.all(
        list.map(async (cmt) => {
          const account = await prisma.accounts.findFirst({
            where: {
              id: cmt.accountId
            }
          });
          let x = { ...cmt, channelName: account.name };
          return x;
        })
      );
  
      return new Response(JSON.stringify(newlist));
    } else {
      return new Response(JSON.stringify(null));
    }
  }
  