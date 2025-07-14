import {useCreateMeetingSummary} from "@/hooks/useCreateMeetingSummary";
import {createMeetingSummaryPDF} from "@/api/createMeetingSummaryPDF";
import {PDF} from "@/types/meeting";

export function useCreateMeetingSummaryPDF() {
    return useCreateMeetingSummary<PDF>(createMeetingSummaryPDF);
}