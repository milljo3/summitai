import GetStartedButton from "@/components/GetStartedButton";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <div className="flex items-center justify-center h-dvh">
        <div className="flex items-center justify-center flex-col gap-8">
          <div className="flex justify-center gap-6 flex-col items-center">
            <h1 className="text-6xl font-bold text-center">Welcome to SummitAi</h1>
            <p className="text-center">Start organizing and summarizing your meetings now!</p>
          </div>
          <GetStartedButton />
          <div className="flex items-center justify-center flex-col gap-1">
            <small>Created by</small>
            <Button variant="outline" className="flex items-center justify-center">
              <Link href="https://github.com/milljo3/summitai" className="flex items-center gap-1">
                <Image src="/githubpfp.png" alt="GitHub Profile Picture" width="25" height="25" />
                <p>@milljo3</p>
                <Image src="/github.svg" alt="GitHub Icon" width="25" height="25" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
  )
}
