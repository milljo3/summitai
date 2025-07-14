"use client"

import TextAreaForm from "@/components/meeting/new/TextAreaForm";
import {Separator} from "@/components/ui/separator";
import PDFForm from "@/components/meeting/new/PDFForm";
import {PDF, Transcript} from "@/types/meeting";
import {useCreateMeetingSummaryText} from "@/hooks/useCreateMeetingSummaryText";
import {Loader2} from "lucide-react";
import {useCreateMeetingSummaryPDF} from "@/hooks/useCreateMeetingSummaryPDF";

const NewMeetingPage = () => {

    const createMeetingText = useCreateMeetingSummaryText();
    const createMeetingPDF = useCreateMeetingSummaryPDF();

    const handleCreateMeetingSummaryText = async (transcript: Transcript) => {
        createMeetingText.mutate(transcript);
    }

    const handleCreateMeetingSummaryPDF = async (pdf: PDF) => {
        createMeetingPDF.mutate(pdf);
    }

    if (createMeetingText.isPending || createMeetingPDF.isPending) {
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
                isLoading={createMeetingText.isPending || createMeetingPDF.isPending}
            />
            <div className="w-1/2">
                <Separator className="w-full" />
            </div>
            <PDFForm
                onCreateMeetingSummary={handleCreateMeetingSummaryPDF}
                isLoading={createMeetingText.isPending || createMeetingPDF.isPending}
            />
        </div>
    );
};

export default NewMeetingPage;