import prisma from "@/lib/prisma";

interface RequestParams {
  accountId: number;
  targetChannel: number;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params: RequestParams = {
    accountId: parseInt(url.searchParams.get("accountId") || ""),
    targetChannel: parseInt(url.searchParams.get("targetChannel") || ""),
  };

  const sub = await prisma.subcribes.findFirst({
    where: {
      accountId: params.accountId,
      channelId: params.targetChannel,
    },
  });

  return new Response(JSON.stringify(sub));
}