import React, {useEffect, useState} from "react";
import {PatchMeeting, SummaryForm, summarySchema} from "@/types/meeting";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {EditIcon} from "lucide-react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";

interface SummarySectionProps {
    initialSummary: string;
    onSave: (data: PatchMeeting) => void;
    disabled: boolean;
}

const SummarySection = ({initialSummary, onSave, disabled}: SummarySectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<SummaryForm>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: initialSummary
        }
    });

    useEffect(() => {
        if (!isEditing) {
            form.reset({
                summary: initialSummary,
            });
        }
    }, [initialSummary, isEditing, form]);

    const handleSave = (data: PatchMeeting) => {
        if (data.summary !== initialSummary) {
            onSave({summary: data.summary});
        }
        setIsEditing(false);
    }

    const handleCancel = () => {
        form.reset({
            summary: initialSummary,
        });
        setIsEditing(false);
    }

    return (
        <>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold">Summary</h2>
                    {!isEditing && (
                        <Button
                            size="icon"
                            className="size-7"
                            variant="ghost"
                            onClick={() => setIsEditing(true)}
                        >
                            <EditIcon />
                        </Button>
                    )}
                </div>
                <Separator />
                {!isEditing ? (
                    <p>{initialSummary}</p>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 w-full p-2">
                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meeting Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Meeting Summary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Edit the meeting summary.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="w-[90px]"
                                    disabled={disabled}>
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    className="w-[90px]"
                                    variant="secondary"
                                    onClick={handleCancel}
                                    disabled={disabled}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </>
    );
};

export default SummarySection;