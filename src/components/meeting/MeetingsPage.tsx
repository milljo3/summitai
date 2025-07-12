"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useMeetingsQuery} from "@/hooks/useMeetingsQuery";
import {MeetingCard as MeetingCardType} from "@/types/meeting";
import {MeetingCard as MeetingCardComponent} from "@/components/meeting/MeetingCard";

interface MeetingCardProps {
    username: string;
}

const MeetingsPage = ({username}: MeetingCardProps) => {

    const {data, isLoading, error} = useMeetingsQuery();

    return (
        <div className="h-dvh flex flex-col">
            <div className="flex flex-col items-center justify-center p-5 gap-4">
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-lg">Welcome {username}!</h1>
                    <p>Get started with your boards below!</p>
                </div>
                <hr className="max-w-sm w-full border-black" />
                {data?.length !== 0 && (
                    <div className="flex flex-col md:flex-row justify-around items-center p-5 gap-4">
                        <div className="flex">
                            <Input type="search" placeholder="Search by tag" />
                            <Button>Search</Button>
                        </div>
                        <Button>
                            <Link href="/">+ New Meeting</Link>
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {!isLoading ? (
                    data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-5 gap-2">
                            <p>No meetings yet? Create one now!</p>
                            <Button>
                                <Link href="/">+ New Meeting</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {error ? (
                                <p className="text-red-500">Error fetching meetings</p>
                            ) : (
                                data?.map((meeting: MeetingCardType) => (
                                    <MeetingCardComponent
                                        key={meeting.id}
                                        meetingCard={meeting}
                                    />
                                ))
                            )}
                        </>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default MeetingsPage;