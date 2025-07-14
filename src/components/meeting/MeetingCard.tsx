import {MeetingCard as MeetingCardType} from "@/types/meeting";
import Link from "next/link";

interface MeetingCardProps {
    meetingCard: MeetingCardType;
}

export const MeetingCard = ({meetingCard}: MeetingCardProps) => {
    return (
        <Link
            href={`/meetings/${meetingCard.id}`}
            className="flex flex-col items-center p-5 gap-2 border-2 border-black w-[300px] h-64 overflow-y-auto rounded-md"
        >
            <h1 className="text-lg">{meetingCard.title}</h1>
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
        </Link>
    );
};