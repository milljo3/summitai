import {useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Transcript} from "@/types/meeting";
import {toast} from "sonner";
import {createMeetingSummary} from "@/api/createMeetingSummary";

export function useCreateMeetingSummary() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transcript: Transcript) => {
            return await createMeetingSummary(transcript);
        },
        onSuccess: data => {
            if (!data || typeof data !== "string") {
                console.error("Unexpected response from server:", data);
                toast.error("Something went wrong.");
                return;
            }

            queryClient.invalidateQueries( {queryKey: ["meetings"] });
            router.push(`/meetings/${data}`);
        },
        onError: error => {
            console.log(error);
            toast.error("Something went wrong while creating meeting. Please try again later, the LLM might be down.");
        }
    })
}