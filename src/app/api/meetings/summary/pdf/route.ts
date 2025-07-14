import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {saveMeetingToDB, validateAndSummarizeTranscript} from "@/lib/meeting";
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
     try {
            const session = await auth.api.getSession({headers: req.headers});

            if (!session?.user) {
                return NextResponse.json({error: "Unauthorized", status: 401});
            }

            const formData = await req.formData();
            const file = formData.get("pdf") as File;

            if (!file || file.type !== "application/pdf") {
                return NextResponse.json({ error: "Invalid file" }, { status: 400 });
            }

            const buffer = Buffer.from(await file.arrayBuffer());

            const data = await pdf(buffer);

            const cleanedText = data.text
                .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/g, '')
                .replace(/\s+/g, ' ')
                .trim();

            const { transcript, summary } = await validateAndSummarizeTranscript({
                transcript: cleanedText,
            });

            const meeting = await saveMeetingToDB({
                transcript,
                summary,
                userId: session.user.id,
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