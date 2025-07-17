import { z } from "zod";
import {
    DEADLINE_MAX_LENGTH,
    DEADLINE_MIN_LENGTH,
    DECISION_MAX_LENGTH,
    DECISION_MIN_LENGTH,
    MEETING_CARD_SUMMARY_MAX_LENGTH,
    QUESTION_MAX_LENGTH,
    QUESTION_MIN_LENGTH, RESPONSIBLE_MAX_LENGTH, RESPONSIBLE_MIN_LENGTH,
    SUMMARY_MAX_LENGTH,
    SUMMARY_MIN_LENGTH, TAG_MAX_LENGTH,
    TAG_MIN_LENGTH, TASK_MAX_LENGTH, TASK_MIN_LENGTH,
    TITLE_MAX_LENGTH,
    TITLE_MIN_LENGTH,
    TRANSCRIPT_MAX_LENGTH
} from "@/consts/consts";


export const actionSchema = z.object({
    id: z.string(),
    task: z.string()
        .min(TASK_MIN_LENGTH, `Task must be at least ${TASK_MIN_LENGTH} characters.`)
        .max(TASK_MAX_LENGTH, `Task must be shorter than ${TASK_MAX_LENGTH} characters.`)
        .default("unknown"),
    responsible: z.string()
        .min(RESPONSIBLE_MIN_LENGTH, `Responsible must be at least ${RESPONSIBLE_MIN_LENGTH} characters.`)
        .max(RESPONSIBLE_MAX_LENGTH, `Responsible must be shorter than ${RESPONSIBLE_MAX_LENGTH} characters.`)
        .default("unknown"),
    deadline: z.string()
        .min(DEADLINE_MIN_LENGTH, `Deadline must be at least ${DEADLINE_MIN_LENGTH} characters.`)
        .max(DEADLINE_MAX_LENGTH, `Deadline must be shorter than ${DEADLINE_MAX_LENGTH} characters.`)
        .default("unknown"),
});

export const responseActionSchema = actionSchema.omit({ id: true });

export const meetingSchema = z.object({
    id: z.string(),
    title: z.string()
        .min(TITLE_MIN_LENGTH, `Title must be at least ${TITLE_MIN_LENGTH} characters.`)
        .max(TITLE_MAX_LENGTH, `Title must be shorter than ${TITLE_MAX_LENGTH} characters.`)
        .default("Untitled Meeting"),
    summary: z.string()
        .min(SUMMARY_MIN_LENGTH, `Summary must be at least ${SUMMARY_MIN_LENGTH} characters.`)
        .max(SUMMARY_MAX_LENGTH, `Summary must be shorter than ${SUMMARY_MAX_LENGTH} characters.`)
        .default("unknown"),
    actions: z.array(actionSchema).default([]),
    questions: z.array(
        z.string()
            .min(QUESTION_MIN_LENGTH, `Question must be at least ${QUESTION_MIN_LENGTH} characters.`)
            .max(QUESTION_MAX_LENGTH, `Question must be shorter than ${QUESTION_MAX_LENGTH} characters.`)
    ).default([]),
    decisions: z.array(
        z.string()
            .min(DECISION_MIN_LENGTH, `Decision must be at least ${DECISION_MIN_LENGTH} characters.`)
            .max(DECISION_MAX_LENGTH, `Decision must be shorter than ${DECISION_MAX_LENGTH} characters.`)
    ).default([]),
    tags: z.array(
        z.string()
            .min(TAG_MIN_LENGTH, `Tag must be at least ${TAG_MIN_LENGTH} characters.`)
            .max(TAG_MAX_LENGTH, `Tag must be shorter than ${TAG_MAX_LENGTH} characters.`)
    ).default([]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const responseMeetingSummarySchema = meetingSchema.extend({
    actions: z.array(responseActionSchema).default([]),
}).omit({id: true, createdAt: true, updatedAt: true});

export const meetingCardSchema = meetingSchema.extend({
    summary: z.string().max(MEETING_CARD_SUMMARY_MAX_LENGTH + 3), /// 3 for ...
}).omit({ actions: true, questions: true, decisions: true });

export const meetingCardsResponseSchema = z.object({
    meetings: z.array(meetingCardSchema),
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
            message: 'The file must be less than 5MB.',
        })
        .refine((file) => file.type === "application/pdf", {
            message: "Only PDF files are allowed.",
        }),
});

export const patchMeetingSchema = responseMeetingSummarySchema
    .partial()
    .omit({ actions: true });

// Meeting Page Sections

export const titleSchema = meetingSchema.pick({ title: true }).required();
export const summarySchema = meetingSchema.pick({ summary: true }).required();
export const actionFormSchema = actionSchema.omit({ id: true }).required();
export const actionFormArraySchema = z.object({
    actions: z.array(actionFormSchema),
});



export const questionSchema = z.object({
    question: z.string()
        .min(QUESTION_MIN_LENGTH, `Question must be at least ${QUESTION_MIN_LENGTH} characters.`)
        .max(QUESTION_MAX_LENGTH, `Question must be shorter than ${QUESTION_MAX_LENGTH} characters.`)
});
export const decisionSchema = z.object({
    decision: z.string()
        .min(DECISION_MIN_LENGTH, `Decision must be at least ${DECISION_MIN_LENGTH} characters.`)
        .max(DECISION_MAX_LENGTH, `Decision must be shorter than ${DECISION_MAX_LENGTH} characters.`)
});
export const tagSchema = z.object({
    tag: z.string()
        .min(TAG_MIN_LENGTH, `Tag must be at least ${TAG_MIN_LENGTH} characters.`)
        .max(TAG_MAX_LENGTH, `Tag must be shorter than ${TAG_MAX_LENGTH} characters.`)
});

export const questionFormSchema = z.object({
    questions: z.array(questionSchema)
});

export const decisionFormSchema = z.object({
    decisions: z.array(decisionSchema)
});
export const tagFormSchema = z.object({
    tags: z.array(tagSchema)
})

export type Action = z.infer<typeof actionSchema>
export type Meeting = z.infer<typeof meetingSchema>
export type MeetingCard = z.infer<typeof meetingCardSchema>;
export type ResponseAction = z.infer<typeof responseActionSchema>;
export type ResponseMeetingSummary = z.infer<typeof responseMeetingSummarySchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
export type PDF = z.infer<typeof pdfSchema>;
export type PatchMeeting = z.infer<typeof patchMeetingSchema>;

export type TitleForm = z.infer<typeof titleSchema>;
export type SummaryForm = z.infer<typeof summarySchema>;
export type ActionForm = z.infer<typeof actionFormSchema>;
export type ActionFormArray = z.infer<typeof actionFormArraySchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuestionForm = z.infer<typeof questionFormSchema>;
export type Decision = z.infer<typeof decisionSchema>;
export type DecisionForm = z.infer<typeof decisionFormSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type TagForm = z.infer<typeof tagFormSchema>;


export function stringArrayToQuestionItems(strings: string[]): Question[] {
    return strings.map(question => ({ question }));
}

export function questionItemsToStringArray(questions: Question[]): string[] {
    return questions.map(question => question.question);
}

export function stringArrayToDecisionItems(strings: string[]): Decision[] {
    return strings.map(decision => ({ decision }));
}

export function decisionItemsToStringArray(decisions: Decision[]): string[] {
    return decisions.map(decision => decision.decision);
}

export function stringArrayToTagItems(strings: string[]): Tag[] {
    return strings.map(tag => ({ tag }));
}

export function tagItemsToStringArray(tags: Tag[]): string[] {
    return tags.map(tag => tag.tag);
}