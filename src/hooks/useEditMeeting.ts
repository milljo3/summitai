import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {editMeeting} from "@/api/editMeeting";
import {PatchMeeting} from "@/types/meeting";

export function useEditMeeting(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PatchMeeting) => editMeeting(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meeting", id] });
            queryClient.invalidateQueries({ queryKey: ["meetings"] });
            toast.success("Meeting successfully edited.");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong while editing the meeting.");
        },
    });
}