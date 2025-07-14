import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {saveMeetingToDB, validateAndSummarizeTranscript} from "@/lib/meeting";

export async function POST(req: NextRequest) {
    try {
            const session = await auth.api.getSession({headers: req.headers});

            if (!session?.user) {
                return NextResponse.json({error: "Unauthorized", status: 401});
            }

            const body = await req.json();
            const { transcript, summary } = await validateAndSummarizeTranscript(body);

            const meeting = await saveMeetingToDB({
                transcript,
                summary,
                userId: session.user.id
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