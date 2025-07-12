import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {auth} from "@/lib/auth";

export async function GET(req: NextRequest) {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const meetings = await prisma.meeting.findMany({
        where: { userId: session.user.id },
        orderBy: {
            updatedAt: "desc"
        }
    });

    return NextResponse.json({ meetings });
}