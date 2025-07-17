import React, {useEffect, useState} from 'react';
import {Action, ActionForm, ActionFormArray, actionFormArraySchema} from "@/types/meeting";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEditActions} from "@/hooks/useEditActions";
import {Separator} from "@/components/ui/separator";
import ActionsTable from "@/components/meetings/meeting/ActionsTable";
import {EditIcon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

function actionsEqual(a: Action, b: ActionForm): boolean {
    return (
        a.task === b.task &&
        a.responsible === b.responsible &&
        a.deadline === b.deadline
    );
}

function actionArraysAreEqual(a: Action[], b: ActionForm[]): boolean {
    if (a.length !== b.length) return false;

    return a.every((action, i) => actionsEqual(action, b[i]));
}

interface ActionsSectionProps {
    id: string;
    initialActions: Action[];
}

const ActionsSection = ({id, initialActions}: ActionsSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const editActions = useEditActions(id);

    const form = useForm<ActionFormArray>({
        resolver: zodResolver(actionFormArraySchema),
        defaultValues: {
            actions: initialActions,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "actions",
    });

    useEffect(() => {
        if (!isEditing) {
            form.reset({
                actions: initialActions
            });
        }
    }, [initialActions, isEditing, form]);

    const handleSave = (data: ActionFormArray) => {
        if (!actionArraysAreEqual(initialActions, data.actions)) {
            editActions.mutate(data.actions);
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        form.reset({ actions: initialActions });
        setIsEditing(false);
    };

    return (
        <>
            <div
                className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200"
            >
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold">Actions</h2>
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
                    <ActionsTable actions={initialActions} />
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 w-full p-2">
                            {fields.map((field, index) => (
                                <div key={field.id}
                                     className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`actions.${index}.task`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Task" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`actions.${index}.responsible`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Responsible" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`actions.${index}.deadline`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Deadline" {...field} />
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
                                onClick={() => append({ task: "", responsible: "", deadline: "" })}
                            >
                                Add Row
                            </Button>

                            <div className="flex gap-2 mt-4">
                                <Button type="submit" disabled={editActions.isPending}>
                                    Save
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleCancel} disabled={editActions.isPending}>
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

export default ActionsSection;