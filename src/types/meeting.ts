import { z } from "zod";
import {MEETING_CARD_SUMMARY_MAX_LENGTH, TRANSCRIPT_MAX_LENGTH} from "@/consts/consts";

export const responseActionSchema = z.object({
    task: z.string().default("unknown"),
    responsible: z.string().default("unknown"),
    deadline: z.string().default("unknown"),
});

export const responseMeetingSummarySchema = z.object({
    title: z.string().default("Untitled Meeting"),
    summary: z.string().default("unknown"),
    actions: z.array(responseActionSchema).default([]),
    questions: z.array(z.string()).default([]),
    decisions: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
});

export const meetingCardSchema = z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string().max(MEETING_CARD_SUMMARY_MAX_LENGTH + 3), /// 3 for ...
    tags: z.array(z.string()),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const meetingCardsResponseSchema = z.object({
    meetings: z.array(meetingCardSchema),
});


export const actionSchema = responseActionSchema.extend({
   id: z.string(),
});

export const meetingSchema = responseMeetingSummarySchema.extend({
    questions: z.array(z.string()).default([]),
    decisions: z.array(z.string()).default([]),
    actions: z.array(actionSchema).default([]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const transcriptSchema = z.object({
    transcript: z
        .string()
        .min(10, {
            message: "Transcript must be at least 10 characters.",
        })
        .max(TRANSCRIPT_MAX_LENGTH, {
            message: "Transcript must not be longer than 3000 characters.",
        }),
});

export const pdfSchema = z.object({
    pdf: z
        .instanceof(File)
        .refine((file) => file.size < 5000000, {
            message: 'The file must be less than 5MB to ensure smooth processing.',
        })
        .refine((file) => file.type === "application/pdf", {
            message: "Only PDF files are allowed.",
        }),
});

export const patchMeetingSchema = responseMeetingSummarySchema.partial();

// Meeting Page Sections

export const titleSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 characters.").max(200, "Title must be shorter than 200 characters."),
});

export const summarySchema = z.object({
    summary: z.string().min(1, "Summary must be at least 1 characters.").max(1200, "Summary must be shorter than 1200 characters.")
});

export type Action = z.infer<typeof actionSchema>
export type Meeting = z.infer<typeof meetingSchema>
export type MeetingCard = z.infer<typeof meetingCardSchema>;
export type ResponseMeetingSummary = z.infer<typeof responseMeetingSummarySchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
export type PDF = z.infer<typeof pdfSchema>;
export type PatchMeeting = z.infer<typeof patchMeetingSchema>;

export type TitleForm = z.infer<typeof titleSchema>;
export type SummaryForm = z.infer<typeof summarySchema>;