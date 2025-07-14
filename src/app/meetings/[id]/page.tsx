import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import MeetingPage from "@/components/meetings/meeting/MeetingPage";

const Page = async () => {
    const headersList = await headers()
    const session = await auth.api.getSession({
        headers: headersList
    });

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <MeetingPage />
    );
};

export default Page;