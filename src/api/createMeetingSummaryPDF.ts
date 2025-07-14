import {PDF} from "@/types/meeting";

export const createMeetingSummaryPDF = async (pdf: PDF): Promise<string> => {
    const formData = new FormData();
    formData.append("pdf", pdf.pdf);

    const response = await fetch("/api/meetings/summary/pdf", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to summarize meeting");
    }

    return await response.json();
}