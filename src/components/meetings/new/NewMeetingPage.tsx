"use client"

import TextAreaForm from "@/components/meetings/new/TextAreaForm";
import {Separator} from "@/components/ui/separator";
import PDFForm from "@/components/meetings/new/PDFForm";
import {PDF, Transcript} from "@/types/meeting";
import {useCreateMeetingSummaryText} from "@/hooks/useCreateMeetingSummaryText";
import {Loader2} from "lucide-react";
import {useCreateMeetingSummaryPDF} from "@/hooks/useCreateMeetingSummaryPDF";
import ReturnButton from "@/components/ReturnButton";

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
            <h1 className="text-2xl font-extrabold">Summarize a meeting transcript</h1>
            <h2 className="font-bold text-2xl">Submit as text</h2>
            <TextAreaForm
                onCreateMeetingSummary={handleCreateMeetingSummaryText}
                isLoading={createMeetingText.isPending || createMeetingPDF.isPending}
            />
            <div className="w-1/2 flex items-center justify-center">
                <Separator className="max-w-sm" />
                <p>or</p>
                <Separator className="max-w-sm" />
            </div>
            <h2 className="font-bold text-2xl">Submit as PDF</h2>
            <PDFForm
                onCreateMeetingSummary={handleCreateMeetingSummaryPDF}
                isLoading={createMeetingText.isPending || createMeetingPDF.isPending}
            />

            <ReturnButton
                href="/dashboard"
                className="absolute top-5 left-20 w-[120px] p-0 hidden md:block"
            />
        </div>
    );
};

export default NewMeetingPage;