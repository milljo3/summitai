export const deleteMeeting = async (id: string) => {
    const response = await fetch(`/api/meetings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) throw new Error("Failed to delete meeting");
}