import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar";
import AboutYou from "./about-you";
import { getUserProfile } from "../auth/get-user";
import Link from "next/link";

export default async function Profile(){

  const data = await getUserProfile();

  return (
    <div className="md:py-4 pt-8 pb-6 flex flex-col items-center gap-y-6">
      <UserAvatar className="md:h-40 md:w-40 h-32 w-32" />
      <div className="py-2 lg:w-1/2 xs:w-2/3 w-4/5 inline-flex flex-col">
        <Button 
          asChild
          variant="outline" 
          className="md:w-5/6 w-full font-semibold rounded-full border-primary text-primary hover:text-white hover:bg-primary self-center mb-6"
        >
          <Link href={"/public-profile/" + data?.id }>
            View public profile
          </Link>
        </Button>
        <AboutYou about={data.about} />
      </div>
    </div>
  )
}