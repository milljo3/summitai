import {useQuery} from "@tanstack/react-query";
import {fetchMeetings} from "@/api/fetchMeetings";
import {MeetingCard} from "@/types/meeting";

export const useMeetingsQuery = () => {
  return useQuery<MeetingCard[]>({
        queryKey: ["meetings"],
        queryFn: () => fetchMeetings(),
    });
}