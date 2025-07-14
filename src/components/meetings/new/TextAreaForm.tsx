"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button";
import {transcriptSchema} from "@/types/meeting"
import {Transcript} from "@/types/meeting"

const removeExtraWhitespace = (text: string) => {
    return text
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .replace(/\r/g, '');
};

interface TextAreaFormProps {
    onCreateMeetingSummary: (transcript: Transcript) => void;
    isLoading: boolean;
}

const TextAreaForm = ({onCreateMeetingSummary, isLoading}: TextAreaFormProps) => {
    const form = useForm<Transcript>({
        resolver: zodResolver(transcriptSchema),
    });

    function onSubmit(transcript: Transcript) {
        const cleanedTranscript = removeExtraWhitespace(transcript.transcript);
        onCreateMeetingSummary({ ...transcript, transcript: cleanedTranscript });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={
                form.handleSubmit(onSubmit)
            }
                className="md:w-1/2 w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="transcript"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Transcript</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Meeting transcript"
                                    className="resize-none h-64"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Paste in your meeting transcript above.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    )
};

export default TextAreaForm;