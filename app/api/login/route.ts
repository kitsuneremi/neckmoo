import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const user = await prisma.accounts.findFirst({
        where: {
            username: body.username,

        }
    })

    if (user && await bcrypt.compare(body.password, user.password)) {
        const { password, ...UserWithoutPass } = user
        return new Response(JSON.stringify(UserWithoutPass))
    } else {
        return new Response(JSON.stringify(null));
    }
}

