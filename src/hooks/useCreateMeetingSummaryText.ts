import {useCreateMeetingSummary} from "@/hooks/useCreateMeetingSummary";
import {createMeetingSummaryText} from "@/api/createMeetingSummaryText";
import {Transcript} from "@/types/meeting";

export function useCreateMeetingSummaryText() {
    return useCreateMeetingSummary<Transcript>(createMeetingSummaryText);
}