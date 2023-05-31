import prisma from "@/lib/prisma";
import { where } from "sequelize";
interface RequestBody {
    accountId: number;
    targetId: number;
    type: number
}
export async function POST(request: Request) {
    const data: RequestBody = await request.json();
    const like = await prisma.likes.deleteMany(
        {
            where: {
                accountId: data.accountId,
                videoId: data.targetId
            }
        }
    )
    return new Response(JSON.stringify(null))
}