"use client"

import {useMeetingQuery} from "@/hooks/useMeetingQuery";
import {Loader2} from "lucide-react";
import {redirect, useParams} from "next/navigation";
import {toast} from "sonner";
import {useEffect} from "react";
import ActionsTable from "@/components/meetings/meeting/ActionsTable";
import {Separator} from "@/components/ui/separator";
import ReturnButton from "@/components/ReturnButton";

const MeetingPage = () => {
    const params = useParams();
    const id = params.id as string;

    const {data, isLoading, error} = useMeetingQuery(id);

    useEffect(() => {
        if (error) {
            toast.error("Error fetching meeting or meeting does not exist.");
            redirect("/dashboard");
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center h-dvh justify-center">
                <p>Fetching meeting...</p>
                <Loader2 className="animate-spin h-6 w-6" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-dvh gap-4 p-4 pb-6">
            <h1 className="font-extrabold text-3xl">{data?.title}</h1>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Summary</h2>
                <Separator />
                <p>{data?.summary}</p>
            </div>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Questions</h2>
                <Separator />
                <ul style={{ listStyleType: "disc" }} className="w-full pl-4">
                    {data?.questions.map((question, index) => (
                        <li key={index}>
                            {question}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                <h2 className="text-2xl font-bold">Decisions</h2>
                <Separator />
                <ul style={{ listStyleType: "disc" }} className="w-full pl-4">
                    {data?.decisions.map((decision, index) => (
                        <li key={index}>
                            {decision}
                        </li>
                    ))}
                </ul>
            </div>
            {data?.actions && (
                <div className="flex flex-col items-center md:w-2/3 w-full border-1 border-gray-200">
                    <h2 className="text-2xl font-bold">Actions</h2>
                    <Separator />
                    <ActionsTable actions={data.actions} />
                </div>
            )}

            <ReturnButton
                href="/dashboard"
                className="absolute top-5 left-20 w-[120px] p-0 hidden md:block"
            />
        </div>
    );
};

export default MeetingPage;