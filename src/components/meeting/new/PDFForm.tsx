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
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {PDF, pdfSchema} from "@/types/meeting";

interface PDFFormProps {
    onCreateMeetingSummary: (pdf: PDF) => void;
    isLoading: boolean;
}

const PDFForm = ({onCreateMeetingSummary, isLoading}: PDFFormProps) => {
    const form = useForm<PDF>({
        resolver: zodResolver(pdfSchema),
    })

    function onSubmit(pdf: PDF) {
        onCreateMeetingSummary(pdf);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="pdf"
                    render={({ field: {onChange, ...fieldProps} }) => (
                        <FormItem>
                            <FormLabel>Meeting Transcript</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    placeholder="Transcript"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            onChange(file);
                                        }
                                    }}
                                    value={undefined}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload a pdf of your transcript - Only Text Supported
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </Form>
    )
};

export default PDFForm;