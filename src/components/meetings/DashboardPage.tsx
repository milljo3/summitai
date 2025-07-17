"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useMeetingCardsQuery} from "@/hooks/useMeetingCardsQuery";
import {MeetingCard as MeetingCardType} from "@/types/meeting";
import {MeetingCard as MeetingCardComponent} from "@/components/meetings/MeetingCard";
import {FilterIcon, Loader2} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useEffect, useMemo, useState} from "react";

interface MeetingCardProps {
    username: string;
}

const DashboardPage = ({username}: MeetingCardProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filterTagsIsOpen, setFilterTagsIsOpen] = useState<boolean>(false);

    const {data, isLoading, error} = useMeetingCardsQuery();

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        data?.forEach((meeting) => {
            meeting.tags.forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    }, [data]);

    const filteredMeetings = useMemo(() => {
        return data?.filter((meeting) => {
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => meeting.tags.includes(tag));

            const query = searchQuery.toLowerCase();
            const matchesSearch =
                meeting.title.toLowerCase().includes(query) ||
                meeting.summary.toLowerCase().includes(query) ||
                meeting.tags.some((tag) => tag.toLowerCase().includes(query));

            return matchesTags && matchesSearch;
        }) || [];
    }, [data, selectedTags, searchQuery]);

    useEffect(() => {
        const availableTags = Object.keys(tagCounts);
        const validSelectedTags = selectedTags.filter(tag => availableTags.includes(tag));

        if (validSelectedTags.length !== selectedTags.length) {
            setSelectedTags(validSelectedTags);
        }
    }, [tagCounts, selectedTags])

    return (
        <div className="h-dvh flex flex-col p-2">
            <div className="flex flex-col items-center justify-center p-5 gap-4">
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-lg">Welcome {username}!</h1>
                    <p className="text-center">Get started with your meetings below!</p>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <Separator className="max-w-sm w-full bg-black" />
                </div>
                {!isLoading && data?.length !== 0 && (
                    <div className="flex flex-col md:flex-row justify-around items-center p-5 gap-6 md:w-[600px] w-full">
                        <Button
                            className="hidden md:flex"
                            size="icon"
                            variant={filterTagsIsOpen ? "default" : "outline"}
                            onClick={() => {setFilterTagsIsOpen(!filterTagsIsOpen)}}
                        >
                            <FilterIcon />
                        </Button>
                        {!error && (
                            <div className="flex items-center gap-2 md:w-full w-full md:flex-row flex-col">
                                <Input
                                    type="search"
                                    placeholder="Search title, summary, or tag"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={() => setSearchQuery("")}
                                >
                                    Clear
                                </Button>
                            </div>
                        )}
                        <Button>
                            <Link href="/meetings/new">+ New Meeting</Link>
                        </Button>
                    </div>
                )}
                <div className="md:flex flex-wrap gap-2 justify-center hidden">
                    {filterTagsIsOpen && Object.entries(tagCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([tag, count]) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <Button
                                key={tag}
                                variant={isSelected ? "default" : "outline"}
                                onClick={() =>
                                    setSelectedTags((prev) =>
                                        prev.includes(tag)
                                            ? prev.filter((t) => t !== tag)
                                            : [...prev, tag]
                                    )
                                }
                            >
                                {tag} ({count})
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-4 pb-6">
                {!isLoading ? (
                    data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-5 gap-2">
                            <p>No meetings yet? Create one now!</p>
                            <Button>
                                <Link href="/meetings/new">+ New Meeting</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {error ? (
                                <p className="text-red-500">Error fetching meetings</p>
                            ) : (
                                filteredMeetings.map((meeting: MeetingCardType) => (
                                    <MeetingCardComponent
                                        key={meeting.id}
                                        meetingCard={meeting}
                                    />
                                ))
                            )}
                        </>
                    )
                ) : (
                    <Loader2 className="animate-spin h-6 w-6" />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;