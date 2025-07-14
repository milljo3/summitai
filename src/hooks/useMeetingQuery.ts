import {useQuery} from "@tanstack/react-query";
import {fetchMeeting} from "@/api/fetchMeeting";
import {Meeting} from "@/types/meeting";

export const useMeetingQuery = (id?: string) => {
    return useQuery<Meeting>({
        queryKey: ["meeting", id],
        queryFn: () => fetchMeeting(id!),
        enabled: !!id
    });
}