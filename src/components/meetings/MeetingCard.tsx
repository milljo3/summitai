import {MeetingCard as MeetingCardType} from "@/types/meeting";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {DeleteButton} from "@/components/meetings/DeleteButton";

interface MeetingCardProps {
    meetingCard: MeetingCardType;
}

const INITIAL_TAGS = 3;

export const MeetingCard = ({meetingCard}: MeetingCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialTags = meetingCard.tags.slice(0, INITIAL_TAGS);

    const tags = (
        <div className="flex flex-wrap gap-2">
            {!isOpen ? (
                initialTags.map(tag => (
                        <Badge
                            key={tag}
                        >
                            <p>{tag}</p>
                        </Badge>
                    ))
            ) : (
                meetingCard.tags.map(tag => (
                        <Badge
                            key={tag}
                        >
                            <p>{tag}</p>
                        </Badge>
                    ))
            )}
        </div>
    )

    return (
        <div
            className="flex flex-col items-center px-5 py-3 gap-3 border-2 border-black w-[300px] h-64 overflow-y-auto rounded-md relative"
        >
            <div className="flex w-full px-10 md:px-8">
                <Link
                    className="flex items-center justify-center gap-1 underline w-full"
                    href={`/meetings/${meetingCard.id}`}
                >
                    <p className="text-center">{meetingCard.title}</p>
                    <ArrowUpRight />
                </Link>
            </div>
            <p className="text-sm">{meetingCard.summary}</p>
            <div className="flex flex-col gap-2 flex-1 w-full">
                {tags}
            </div>
            {meetingCard.tags.length > INITIAL_TAGS && (
                <Button
                    size="default"
                    className="w-1/2 self-center"
                    variant="ghost"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{isOpen ? "View less" : "View more"}</p>
                </Button>
            )}

            <DeleteButton title={meetingCard.title} className="absolute top-1 right-1 size-7"/>
        </div>
    );
};