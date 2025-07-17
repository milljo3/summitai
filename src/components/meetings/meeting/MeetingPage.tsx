"use client"

import {useMeetingQuery} from "@/hooks/useMeetingQuery";
import {Loader2} from "lucide-react";
import {redirect, useParams} from "next/navigation";
import {toast} from "sonner";
import {useEffect} from "react";
import ReturnButton from "@/components/ReturnButton";
import TitleSection from "@/components/meetings/meeting/TitleSection";
import {PatchMeeting} from "@/types/meeting";
import {useEditMeeting} from "@/hooks/useEditMeeting";
import ActionsSection from "@/components/meetings/meeting/ActionsSection";
import DecisionsSection from "@/components/meetings/meeting/DecisionsSection";
import QuestionsSection from "@/components/meetings/meeting/QuestionsSection";
import SummarySection from "@/components/meetings/meeting/SummarySection";
import TagsSection from "@/components/meetings/meeting/TagsSection";

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
        <div className="flex flex-col items-center h-dvh gap-4 px-4 overflow-y-auto pt-20 pb-6">
            <TitleSection initialTitle={data.title} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <SummarySection initialSummary={data.summary} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <QuestionsSection initialQuestions={data.questions} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <DecisionsSection initialDecisions={data.decisions} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <ActionsSection id={id} initialActions={data.actions} />
            <TagsSection initialTags={data.tags} onSave={handleEditMeeting} disabled={editMeeting.isPending} />
            <ReturnButton
                href="/dashboard"
                className="absolute top-5 lg:left-45 w-[120px] p-0 hidden md:block md:left-[120px]"
            />
        </div>
    );
};

export default MeetingPage;