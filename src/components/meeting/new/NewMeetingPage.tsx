"use client"

import TextAreaForm from "@/components/meeting/new/TextAreaForm";
import {Separator} from "@/components/ui/separator";
import PDFForm from "@/components/meeting/new/PDFForm";
import {Transcript} from "@/types/meeting";
import {useCreateMeetingSummary} from "@/hooks/useCreateMeetingSummary";
import {Loader2} from "lucide-react";

const NewMeetingPage = () => {

    const createMeeting = useCreateMeetingSummary();

    const handleCreateMeetingSummaryText = async (transcript: Transcript) => {
        createMeeting.mutate(transcript);
    }

    if (createMeeting.isPending) {
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
                isLoading={createMeeting.isPending}
            />
            <div className="w-1/2">
                <Separator className="w-full" />
            </div>
            <PDFForm />
        </div>
    );
};

export default NewMeetingPage;