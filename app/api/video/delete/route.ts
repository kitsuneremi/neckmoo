import prisma from "@/lib/prisma";
import axios from "axios";

interface RequestBody {
    id: number,
    link: string
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    axios.delete('http://localhost:5000/api/filedelete/video/img', {
        data: {
            fileName: body.link
        }
    })
    axios.delete('http://localhost:5000/api/filedelete/video/vid', {
        data: {
            fileName: body.link
        }
    })
    const video = await prisma.videos.delete({
        where: {
            id: body.id
        }
    })
    return new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
}