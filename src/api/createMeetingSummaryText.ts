import {Transcript} from "@/types/meeting";

export const createMeetingSummaryText = async (transcript: Transcript): Promise<string> => {
    const response = await fetch("/api/meetings/summary/text", {
        method: "POST",
        body: JSON.stringify(transcript),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Failed to summarize meeting");
    }

    return await response.json();
}