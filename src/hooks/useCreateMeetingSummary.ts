import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateMeetingSummary<T>(mutationFn: (input: T) => Promise<string>): UseMutationResult<string, unknown, T> {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (!data) {
                console.error("Unexpected response from server:", data);
                toast.error("Something went wrong.");
                return;
            }

            queryClient.invalidateQueries({ queryKey: ["meetings"] });
            router.push(`/meetings/${data}`);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong while creating meeting. Please try again later, the LLM might be down.");
        },
    });
}