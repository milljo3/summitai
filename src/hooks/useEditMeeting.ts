import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {editMeeting} from "@/api/editMeeting";
import {PatchMeeting} from "@/types/meeting";

export function useEditMeeting(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PatchMeeting) => editMeeting(id, data),
        onMutate: async (newData: PatchMeeting) => {
            await queryClient.cancelQueries({ queryKey: ["meeting", id] });

            const previousMeeting = queryClient.getQueryData(["meeting", id]);

            queryClient.setQueryData(["meeting", id], (old: unknown) => {
                if (!old) return old;
                return {
                    ...old,
                    ...newData
                };
            });

            return { previousMeeting };
        },
        onError: (error, _newData, context) => {
            if (context?.previousMeeting) {
                queryClient.setQueryData(["meeting", id], context.previousMeeting);
            }
            console.error(error);
            toast.error("Something went wrong while editing the meeting.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meeting", id] });
            queryClient.invalidateQueries({ queryKey: ["meetings"] });
            toast.success("Meeting successfully edited.");
        },
    });
}