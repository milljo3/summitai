import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {deleteMeeting} from "@/api/deleteMeeting";
import {MeetingCard} from "@/types/meeting";

export function useDeleteMeeting(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteMeeting(id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["meetings"] });

            const previousMeetings = queryClient.getQueryData(["meetings"]);

            queryClient.setQueryData(["meetings"], (old: MeetingCard[] | undefined) => {
                if (!old) return old;
                return old.filter((meeting) => meeting.id !== id);
            });

            return { previousMeetings };
        },
        onError: (error, _variables, context) => {
            if (context?.previousMeetings) {
                queryClient.setQueryData(["meetings"], context.previousMeetings);
            }
            console.error(error);
            toast.error("Something went wrong while deleting the meeting.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meetings"] });
            toast.success("Meeting successfully deleted.");
        },
    });
}