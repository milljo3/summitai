"use client"

import {useMeetingQuery} from "@/hooks/useMeetingQuery";
import {Loader2} from "lucide-react";
import {redirect, useParams} from "next/navigation";
import {toast} from "sonner";
import {useEffect} from "react";
import ActionsTable from "@/components/meetings/meeting/ActionsTable";
import {Separator} from "@/components/ui/separator";
import ReturnButton from "@/components/ReturnButton";
import TitleSection from "@/components/meetings/meeting/TitleSection";
import {PatchMeeting} from "@/types/meeting";
import {useEditMeeting} from "@/hooks/useEditMeeting";

const MeetingPage = () => {
    const params = useParams();
    const id = params.id as string;

    const {data, isLoading, error} = useMeetingQuery(id);
    const editMeeting = useEditMeeting(id);

    useEffect(() => {
        if (error) {
            toast.error("Error fetching meeting or meeting does not exist.");
            redirect("/dashboard");
        }
    }, [error]);

    const handleEditMeeting = (data: PatchMeeting) => {
        editMeeting.mutate(data);
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center h-dvh justify-center">
                <p>Fetching meeting...</p>
                <Loader2 className="animate-spin h-6 w-6" />
            </div>
        )
    }

    if (!data) {
        redirect("/dashboard");
    }

    return (
        <div className="flex flex-col items-center h-dvh gap-4 px-4 py-6">
            <TitleSection initialTitle={data.title} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Summary</h2>
                <Separator />
                <p>{data.summary}</p>
            </div>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Questions</h2>
                <Separator />
                <ul style={{ listStyleType: "disc" }} className="w-full pl-4">
                    {data.questions.map((question, index) => (
                        <li key={index}>
                            {question}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Decisions</h2>
                <Separator />
                <ul style={{ listStyleType: "disc" }} className="w-full pl-4">
                    {data.decisions.map((decision, index) => (
                        <li key={index}>
                            {decision}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Actions</h2>
                <Separator />
                <ActionsTable actions={data.actions} />
            </div>

            <ReturnButton
                href="/dashboard"
                className="absolute top-5 lg:left-15 w-[120px] p-0 hidden md:block md:left-5"
            />
        </div>
    );
};

export default MeetingPage;