import { Montserrat } from "next/font/google";
import { Button } from "./ui/button";
import Link from "next/link";
const montserrat = Montserrat({ subsets: ["latin"] })

export default function RequiredLogin(){
  return (
    <div className="mx-auto md:px-8 px-6 max-w-screen-2xl h-screen">
      <div className="xs:py-6 py-4 flex flex-col gap-y-4 items-center h-full">
        <div className="my-auto flex flex-col items-center xs:gap-y-8 gap-y-6">
          <h1 className={"text-5xl text-[#16a34a] tracking-wide font-bold " + montserrat.className}>GreenGive</h1>
          <h5 className="text-center xs:text-xl text-lg leading-7 text-grey-2">Give it away and<br /> make someone&apos;s day</h5>
        </div>
        <div className="flex flex-col gap-y-5 sm:w-3/5 w-full mb-1">
          <Button asChild className="xs:text-xl text-lg py-2.5 px-6 h-auto rounded-3xl">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <div className="inline-flex flex-row items-center justify-center gap-x-4">
            <div className="whitespace-nowrap text-grey-2">Already have an account?</div>
            <Button asChild className="px-5 rounded-3xl">
              <Link href="/sign-in">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}