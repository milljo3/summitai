import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {deleteMeeting} from "@/api/deleteMeeting";

export function useDeleteMeeting(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteMeeting(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meetings"] });
            toast.success("Meeting successfully deleted.");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong while deleting the meeting.");
        },
    });
}