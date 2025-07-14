"use client"

import {useMeetingQuery} from "@/hooks/useMeetingQuery";
import {Loader2} from "lucide-react";
import {useRouter} from "next/router";
import {redirect} from "next/navigation";
import {toast} from "sonner";
import {useEffect} from "react";

const MeetingPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const meetingId = typeof id === 'string' ? id : undefined;

    const {data, isLoading, error} = useMeetingQuery(meetingId);

    useEffect(() => {
        if (error) {
            toast.error("Error fetching meeting or meeting does not exist.");
            redirect("/dashboard");
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center h-dvh justify-center">
                <p>Fetching meeting...</p>
                <Loader2 className="animate-spin h-6 w-6" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-dvh">
            <h1>{data?.title}</h1>
            <p>{data?.summary}</p>
            <ul>
                {data?.questions.map((question, index) => (
                    <li key={index}>
                        {question}
                    </li>
                ))}
            </ul>
            <ul>
                {data?.decisions.map((decision, index) => (
                    <li key={index}>
                        {decision}
                    </li>
                ))}
            </ul>
            <table>
                {data?.actions.map((action) => (
                    <tr key={action.id}>

                    </tr>
                ))}
            </table>
        </div>
    );
};

export default MeetingPage;