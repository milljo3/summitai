import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import DashboardPage from "@/components/meetings/DashboardPage";

const Page = async () => {
    const headersList = await headers()

    const session = await auth.api.getSession({
        headers: headersList
    });

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <DashboardPage username={session.user.name}/>
    );
};

export default Page;