import {useEffect, useState} from "react";
import {PatchMeeting, TitleForm, titleSchema} from "@/types/meeting";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {EditIcon} from "lucide-react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface TitleSectionProps {
    initialTitle: string;
    onSave: (data: PatchMeeting) => void;
    disabled: boolean;
}

const TitleSection = ({initialTitle, onSave, disabled}: TitleSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<TitleForm>({
        resolver: zodResolver(titleSchema),
        defaultValues: {
            title: initialTitle
        }
    });

    useEffect(() => {
        if (!isEditing) {
            form.reset({
                title: initialTitle,
            });
        }
    }, [initialTitle, isEditing, form]);

    const handleSave = (data: PatchMeeting) => {
        if (data.title !== initialTitle) {
            onSave({title: data.title});
        }
        setIsEditing(false);
    }

    const handleCancel = () => {
        form.reset({
            title: initialTitle,
        });
        setIsEditing(false);
    }

    return (
        <>
            {!isEditing ? (
                <div className="flex items-center justify-center gap-2 z-10">
                    <h1 className="font-extrabold text-3xl text-center">{initialTitle}</h1>
                    <Button
                        size="icon"
                        className="size-7"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                    >
                        <EditIcon />
                    </Button>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="md:w-2/3 space-y-6 w-full z-10">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meeting Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Meeting title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Edit the meeting title.
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
        </>
    );
};

export default TitleSection;