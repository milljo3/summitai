"use client"

import TextAreaForm from "@/components/meeting/new/TextAreaForm";
import {Separator} from "@/components/ui/separator";
import {Transcript} from "@/types/meeting";
import {useCreateMeetingSummaryText} from "@/hooks/useCreateMeetingSummaryText";
import {Loader2} from "lucide-react";

const NewMeetingPage = () => {

    const createMeetingText = useCreateMeetingSummaryText();

    const handleCreateMeetingSummaryText = async (transcript: Transcript) => {
        createMeetingText.mutate(transcript);
    }

    if (createMeetingText.isPending) {
        return (
            <div className="h-dvh flex flex-col gap-4 items-center justify-center">
                <p className="text-lg">Generating your meeting summary...</p>
                <Loader2 className="animate-spin h-6 w-6" />
            </div>
        )
    }

    return (
        <div className="h-dvh flex flex-col items-center justify-center gap-6">
            <TextAreaForm
                onCreateMeetingSummary={handleCreateMeetingSummaryText}
                isLoading={createMeetingText.isPending}
            />
            <div className="w-1/2">
                <Separator className="w-full" />
            </div>
        </div>
    );
};

export default NewMeetingPage;