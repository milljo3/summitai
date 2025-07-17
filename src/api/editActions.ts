import {ResponseAction} from "@/types/meeting";

export const editActions = async (id: string, actions: ResponseAction[]) => {
    const res = await fetch(`/api/meetings/${id}/actions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actions),
    });

    if (!res.ok) throw new Error("Failed to update actions");
};
