import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // or wherever your auth lives
import { prisma } from "@/lib/prisma";
import {responseActionSchema} from "@/types/meeting";

export async function PUT(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = req.nextUrl.pathname.split("/")[3];
        const body = await req.json();

        const parsed = responseActionSchema.array().safeParse(body);
        if (!parsed.success) {
            console.error(parsed.error);
            return NextResponse.json({ error: "Invalid action schema" }, { status: 400 });
        }

        const actions = parsed.data;

        await prisma.$transaction(async (tx) => {
            await tx.action.deleteMany({
                where: { meetingId: id },
            });

            if (actions.length > 0) {
                await tx.action.createMany({
                    data: actions.map((action) => ({
                        ...action,
                        meetingId: id,
                    })),
                });
            }
        });

        return NextResponse.json({ message: "Actions updated successfully" });
    } catch (error) {
        console.error("PUT /meetings/[id]/actions error:", error);
        return new NextResponse(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
