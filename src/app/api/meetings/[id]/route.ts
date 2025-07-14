import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {meetingSchema} from "@/types/meeting";

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            throw new Error("Meeting not found");
        }

        const meeting = await prisma.meeting.findUnique({
            where: { id: id },
            select: {
                id: true,
                title: true,
                summary: true,
                actions: true,
                questions: true,
                decisions: true,
                tags: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const parsed = meetingSchema.safeParse(meeting);
        if (!parsed.success) {
            throw new Error("Meeting schema invalid");
        }

        return NextResponse.json(parsed.data);
    }
    catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify(error),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}