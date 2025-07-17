import React, {useEffect, useState} from "react";
import {
    PatchMeeting,
    stringArrayToTagItems, TagForm, tagFormSchema, tagItemsToStringArray
} from "@/types/meeting";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";

interface TagsSectionProps {
    initialTags: string[];
    onSave: (data: PatchMeeting) => void;
    disabled: boolean;
}

const TagsSection = ({initialTags, onSave, disabled}: TagsSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<TagForm>({
        resolver: zodResolver(tagFormSchema),
        defaultValues: {
            tags: stringArrayToTagItems(initialTags)
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "tags",
    });

    useEffect(() => {
        if (!isEditing) {
            form.reset({
                tags: stringArrayToTagItems(initialTags),
            });
        }
    }, [initialTags, isEditing, form]);

    const handleSave = (data: TagForm) => {
        const tagsAsStrings = tagItemsToStringArray(data.tags);

        const hasChanges = JSON.stringify(tagsAsStrings) !== JSON.stringify(initialTags);

        if (hasChanges) {
            onSave({ tags: tagsAsStrings });
        }
        setIsEditing(false);
    }

    const handleCancel = () => {
        form.reset({
            tags: stringArrayToTagItems(initialTags),
        });
        setIsEditing(false);
    }

    return (
        <>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold">Tags</h2>
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
                    <div className="flex items-center justify-center w-full flex-wrap p-2 gap-2">
                        {initialTags.map((tag, index) => (
                            <Badge key={index}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 w-full p-2">
                            {fields.map((field, index) => (
                                <div key={field.id}
                                     className="grid grid-cols-[1fr_auto] gap-2 items-center"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`tags.${index}.tag`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Tag" {...field} />
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
                                onClick={() => append({ tag: "" })}
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

export default TagsSection;