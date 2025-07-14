import {MeetingCard as MeetingCardType} from "@/types/meeting";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {useState} from "react";
import {Badge} from "@/components/ui/badge";

interface MeetingCardProps {
    meetingCard: MeetingCardType;
}

const INITIAL_TAGS = 3;

export const MeetingCard = ({meetingCard}: MeetingCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialTags = meetingCard.tags.slice(0, INITIAL_TAGS);
    const remainingTags = meetingCard.tags.slice(INITIAL_TAGS);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col items-center px-5 py-3 gap-3 border-2 border-black w-[300px] h-64 overflow-y-auto rounded-md"
        >
            <Link
                className="text-lg flex items-center justify-center gap-2 underline"
                href={`/meetings/${meetingCard.id}`}
            >
                {meetingCard.title} <ArrowUpRight />
            </Link>
            <p className="text-sm">{meetingCard.summary}</p>
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap gap-2">
                    {initialTags.map(tag => (
                        <Badge
                            key={tag}
                        >
                            <p>{tag}</p>
                        </Badge>
                    ))}
                </div>
                {remainingTags.length > 0 && (
                    <CollapsibleContent className="flex flex-wrap gap-2">
                        {remainingTags.map(tag => (
                            <Badge
                                key={tag}
                            >
                                <p>{tag}</p>
                            </Badge>
                        ))}
                    </CollapsibleContent>
                )}
            </div>
            <CollapsibleTrigger asChild>
                <Button size="default" className="w-1/2" variant="ghost">
                    <p>{isOpen ? "View less" : "View more"}</p>
                </Button>
            </CollapsibleTrigger>
        </Collapsible>
    );
};