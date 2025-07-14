import {Transcript} from "@/types/meeting";

export const createMeetingSummary = async (transcript: Transcript): Promise<string> => {
    const response = await fetch("/api/meetings/summary", {
        method: "POST",
        body: JSON.stringify(transcript),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Failed to summarize meeting");
    }

    const data = await response.json();

    console.log("Client: Response Data:", data);

    return data;
}