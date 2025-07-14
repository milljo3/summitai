import {Meeting} from "@/types/meeting"
import {meetingSchema} from "@/types/meeting";

export const fetchMeeting = async (id: string): Promise<Meeting> => {
    const response = await fetch(`/api/meetings/${id}`);
    if (!response.ok) throw new Error("Failed to fetch meeting");

    const json = await response.json();

    const result = meetingSchema.safeParse(json);

    if (!result.success) {
        console.error("Failed to parse meeting", result.error);
        throw new Error("Failed to parse meeting");
    }

    return result.data;
}