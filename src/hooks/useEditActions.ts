import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editActions } from "@/api/editActions";
import { toast } from "sonner";
import {ResponseAction} from "@/types/meeting";

export function useEditActions(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (actions: ResponseAction[]) => editActions(id, actions),
        onMutate: async (newActions: ResponseAction[]) => {
            await queryClient.cancelQueries({ queryKey: ["meeting", id] });

            const previousMeeting = queryClient.getQueryData(["meeting", id]);

            queryClient.setQueryData(["meeting", id], (old: unknown) => {
                if (!old) return old;
                return {
                    ...old,
                    actions: newActions
                };
            });

            return { previousMeeting };
        },
        onError: (error, _newActions, context) => {
            if (context?.previousMeeting) {
                queryClient.setQueryData(["meeting", id], context.previousMeeting);
            }
            console.error(error);
            toast.error("Failed to update actions.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meeting", id] });
            toast.success("Actions updated successfully.");
        },
    });
}