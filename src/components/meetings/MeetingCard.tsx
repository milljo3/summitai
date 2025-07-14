import {MeetingCard as MeetingCardType} from "@/types/meeting";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";

interface MeetingCardProps {
    meetingCard: MeetingCardType;
}

export const MeetingCard = ({meetingCard}: MeetingCardProps) => {
    return (
        <div
            className="flex flex-col items-center p-5 gap-2 border-2 border-black w-[300px] h-64 overflow-y-auto rounded-md"
        >
            <Link
                className="text-lg flex items-center justify-center gap-2 underline"
                href={`/meetings/${meetingCard.id}`}
            >
                {meetingCard.title} <ArrowUpRight />
            </Link>
            <p>{meetingCard.summary}</p>
            <div className="flex flex-wrap gap-2">
                {meetingCard.tags.map(tag => (
                    <div
                        key={tag}
                        className="flex items-center justify-center border-2 border-black bg-blue-300 rounded-md px-2"
                    >
                        <p>{tag}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};