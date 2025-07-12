import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    return (
        <div className="h-dvh flex flex-col">
            <div className="flex flex-col items-center justify-center p-5 gap-4">
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-lg">Welcome User!</h1>
                    <p>Get started with your boards below!</p>
                </div>
                <div className="flex flex-col md:flex-row justify-around items-center p-5 gap-4">
                    <div className="flex">
                        <Input type="search" placeholder="Search by tag" />
                        <Button>Search</Button>
                    </div>
                    <Button>
                        <Link href="/">+ New Meeting</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center justify-center p-5 gap-2 border-2 border-black">
                    <h1 className="text-lg">Meeting Title</h1>
                    <p>Meeting summary snippet...</p>
                    <div className="flex flex-wrap gap-2">
                        <p>Tag</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5 gap-2">
                <p>No meetings yet? Create one now!</p>
                <Button>
                    <Link href="/">+ New Meeting</Link>
                </Button>
            </div>
        </div>
    );
};

export default Page;