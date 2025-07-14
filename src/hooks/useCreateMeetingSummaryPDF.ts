import {useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PDF} from "@/types/meeting";
import {toast} from "sonner";
import {createMeetingSummaryPDF} from "@/api/createMeetingSummaryPDF";

export function useCreateMeetingSummaryPDF() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (pdf: PDF) => {
            return await createMeetingSummaryPDF(pdf);
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