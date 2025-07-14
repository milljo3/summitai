import { z } from "zod";
import {MEETING_CARD_SUMMARY_MAX_LENGTH, TRANSCRIPT_MAX_LENGTH} from "@/consts/consts";

export const meetingSchema = z.object({
    id: z.string(),
    title: z.string(),
    transcript: z.string(),
    sourceType: z.enum(["text", "pdf"]),
    summary: z.string(),
    actionItems: z.array(z.string()),
    questions: z.array(z.string()),
    decisions: z.array(z.string()),
    tags: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string(),
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

export const responseMeetingSummarySchema = z.object({
    title: z.string().default("Untitled Meeting"),
    summary: z.string().default("unknown"),
    actions: z.array(z.object({
        task: z.string().default("unknown"),
        responsible: z.string().default("unknown"),
        deadline: z.string().default("unknown"),
    })).default([]),
    questions: z.array(z.string()).default([]),
    decisions: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
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
})

export type Meeting = z.infer<typeof meetingSchema>;
export type MeetingCard = z.infer<typeof meetingCardSchema>;
export type ResponseMeetingSummary = z.infer<typeof responseMeetingSummarySchema>;
export type Transcript = z.infer<typeof transcriptSchema>;