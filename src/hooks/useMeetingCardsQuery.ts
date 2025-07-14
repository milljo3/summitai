import {useQuery} from "@tanstack/react-query";
import {fetchMeetingCards} from "@/api/fetchMeetingCards";
import {MeetingCard} from "@/types/meeting";

export const useMeetingCardsQuery = () => {
  return useQuery<MeetingCard[]>({
        queryKey: ["meetings"],
        queryFn: () => fetchMeetingCards(),
    });
}