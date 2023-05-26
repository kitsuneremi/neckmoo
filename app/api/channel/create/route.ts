import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
    tagName: string;
    accountId: number;
    des: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const accessToken = request.headers.get('accessToken');
    if (!accessToken || !verifyToken(accessToken)) {
        return new Response(JSON.stringify({
            error: 'unauthorized'
        }),
            {
                status: 401
            }
        )
    } else {
        const data = await prisma.channels.create({
            data: {
                name: body.name,
                tagName: body.tagName,
                accountId: body.accountId,
                des: body.des
            }
        });

        return new Response(JSON.stringify(data))
    }
}