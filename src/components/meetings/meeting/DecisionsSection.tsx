import React, {useEffect, useState} from "react";
import {
    DecisionForm,
    decisionFormSchema, decisionItemsToStringArray,
    PatchMeeting,
    stringArrayToDecisionItems
} from "@/types/meeting";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";

interface DecisionsSectionProps {
    initialDecisions: string[];
    onSave: (data: PatchMeeting) => void;
    disabled: boolean;
}

const DecisionsSection = ({initialDecisions, onSave, disabled}: DecisionsSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<DecisionForm>({
        resolver: zodResolver(decisionFormSchema),
        defaultValues: {
            decisions: stringArrayToDecisionItems(initialDecisions)
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "decisions",
    });

    useEffect(() => {
        if (!isEditing) {
            form.reset({
                decisions: stringArrayToDecisionItems(initialDecisions),
            });
        }
    }, [initialDecisions, isEditing, form]);

    const handleSave = (data: DecisionForm) => {
        const decisionsAsStrings = decisionItemsToStringArray(data.decisions);

        const hasChanges = JSON.stringify(decisionsAsStrings) !== JSON.stringify(initialDecisions);

        if (hasChanges) {
            onSave({ decisions: decisionsAsStrings });
        }
        setIsEditing(false);
    }

    const handleCancel = () => {
        form.reset({
            decisions: stringArrayToDecisionItems(initialDecisions),
        });
        setIsEditing(false);
    }

    return (
        <>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold">Decisions</h2>
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
                    <ul style={{ listStyleType: "disc" }} className="w-full pl-4">
                        {initialDecisions.map((decision, index) => (
                            <li key={index}>
                                {decision}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 w-full p-2">
                            {fields.map((field, index) => (
                                <div key={field.id}
                                     className="grid grid-cols-[1fr_auto] gap-2 items-center"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`decisions.${index}.decision`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Decision" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="h-10"
                                    >
                                        <TrashIcon />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ decision: "" })}
                            >
                                Add Row
                            </Button>

                            <div className="flex gap-2 mt-4">
                                <Button type="submit" disabled={disabled}>
                                    Save
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleCancel} disabled={disabled}>
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

export default DecisionsSection;