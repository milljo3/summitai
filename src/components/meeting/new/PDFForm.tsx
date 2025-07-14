"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

type PDFSchema = z.infer<typeof pdfSchema>;

const PDFForm = () => {
    const form = useForm<PDFSchema>({
        resolver: zodResolver(pdfSchema),
    })

    function onSubmit({pdf}: PDFSchema) {
        if (pdf) {
            console.log("PDF file submitted:", pdf);
        }
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
};

export default PDFForm;