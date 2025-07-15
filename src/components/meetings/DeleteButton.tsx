import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {TrashIcon} from "lucide-react";
import {useState} from "react";
import {useDeleteMeeting} from "@/hooks/useDeleteMeeting";

interface DeleteButtonProps {
    id: string;
    title: string
    className?: string
}

export function DeleteButton({id, title, className}: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    const deleteMeeting = useDeleteMeeting(id);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild className={className}>
                <Button size="icon" disabled={deleteMeeting.isPending || deleteMeeting.isSuccess}>
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure want to delete the meeting: {title}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this meeting.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {deleteMeeting.mutate()}}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
