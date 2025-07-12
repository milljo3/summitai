import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {auth} from "@/lib/auth";
import {MeetingCardsResponseSchema} from "@/types/meeting";

const MEETING_CARD_SUMMARY_MAX_LENGTH = 50;

function truncateSummary(summary: string): string {
    if (summary.length <= MEETING_CARD_SUMMARY_MAX_LENGTH) return summary;
    return summary.slice(0, MEETING_CARD_SUMMARY_MAX_LENGTH) + "...";
}

export async function GET(req: NextRequest) {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });

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

    const result = MeetingCardsResponseSchema.safeParse({meetings: meetingsUpdated});
    if (!result.success) {
        console.error(result.error);
        return NextResponse.json({ error: "Invalid data shape", status: 500 });
    }

    return NextResponse.json(result.data);
}