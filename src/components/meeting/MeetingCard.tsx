import {MeetingCard as MeetingCardType} from "@/types/meeting";

interface MeetingCardProps {
    meetingCard: MeetingCardType;
}

export const MeetingCard = ({meetingCard}: MeetingCardProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center justify-center p-5 gap-2 border-2 border-black">
                <h1 className="text-lg">{meetingCard.title}</h1>
                <p>{meetingCard.summary}</p>
                <div className="flex flex-wrap gap-2">
                    {meetingCard.tags.map(tag => (
                        <div
                            key={tag}
                            className="flex items-center justify-center border-2 border-black bg-blue-300 rounded-md"
                        >
                            <p>tag</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};