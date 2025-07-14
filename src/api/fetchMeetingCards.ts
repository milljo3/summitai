import {MeetingCard, meetingCardsResponseSchema} from "@/types/meeting";

export const fetchMeetingCards = async (): Promise<MeetingCard[]> => {
    const response = await fetch("/api/meetings");
    if (!response.ok) throw new Error("Failed to fetch meetings");

    const json = await response.json();

    const result = meetingCardsResponseSchema.safeParse(json);

    if (!result.success) {
        console.error("Failed to parse meetings", result.error);
        throw new Error("Failed to parse meetings");
    }

    return result.data.meetings;
}