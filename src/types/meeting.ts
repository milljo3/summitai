import { z } from "zod";

export const MeetingSchema = z.object({
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

export const MeetingCardSchema = z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const MeetingCardsResponseSchema = z.object({
    meetings: z.array(MeetingCardSchema),
});

export type Meeting = z.infer<typeof MeetingSchema>;
export type MeetingCard = z.infer<typeof MeetingCardSchema>;
