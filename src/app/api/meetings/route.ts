import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {auth} from "@/lib/auth";
import {meetingCardsResponseSchema} from "@/types/meeting";
import {MEETING_CARD_SUMMARY_MAX_LENGTH} from "@/consts/consts";

function truncateSummary(summary: string): string {
    if (summary.length <= MEETING_CARD_SUMMARY_MAX_LENGTH) return summary;
    return summary.slice(0, MEETING_CARD_SUMMARY_MAX_LENGTH) + "...";
}

export async function GET(req: NextRequest) {
     try {
            const session = await auth.api.getSession({ headers: req.headers });

            if (!session?.user) {
                return NextResponse.json({ error: "Unauthorized", status: 401 });
            }

            const meetings = await prisma.meeting.findMany({
                where: { userId: session.user.id },
                orderBy: { updatedAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    summary: true,
                    tags: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            const meetingsUpdated = meetings.map((meeting) => ({
                ...meeting,
                summary: truncateSummary(meeting.summary),
            }));

            const parsed = meetingCardsResponseSchema.safeParse({meetings: meetingsUpdated});
            if (!parsed.success) {
                console.error(parsed.error);
                return NextResponse.json({ error: "Invalid data shape", status: 500 });
            }

            return NextResponse.json(parsed.data);
        }
        catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Internal Server Error", status: 500 });
        }
}