import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {transcriptSchema} from "@/types/meeting";
import {summarizeMeeting} from "@/lib/openrouter";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const headers = req.headers;

    try {
        const session = await auth.api.getSession({headers});

        if (!session?.user) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const transcript = await req.json();

        const parsed = transcriptSchema.safeParse(transcript);
        if (!parsed.success) {
            console.error(parsed.error);
            return NextResponse.json({ error: "Invalid data shape", status: 500 });
        }

        const summary = await summarizeMeeting(parsed.data.transcript);

        const meeting = await prisma.meeting.create({
            data: {
                title: summary.title,
                transcript: parsed.data.transcript,
                summary: summary.summary,
                actions: {
                    create: summary.actions.map(action => ({
                        task: action.task,
                        responsible: action.responsible,
                        deadline: action.deadline,
                    }))
                },
                questions: summary.questions,
                decisions: summary.decisions,
                tags: summary.tags,
                userId: session.user.id,
            }
        });

        return NextResponse.json(meeting.id);
    }
    catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}