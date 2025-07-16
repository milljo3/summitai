import {PatchMeeting} from "@/types/meeting";

export const editMeeting = async (id: string, data: PatchMeeting) => {
    const response = await fetch(`/api/meetings/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Failed to delete meeting");
}