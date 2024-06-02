import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import UserAvatar from "@/components/user-avatar";
import { getUserProfile } from "../auth/get-user";
import Link from "next/link";

export default async function Profile(){

  const data = await getUserProfile();
  
  return (
    <div className="flex flex-col mx-auto gap-y-2 md:px-8 px-6 max-w-screen-2xl">
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
          <div className="inline-flex flex-col my-4">
            <div className="inline-flex">Verifications</div>
          </div>
          <div className="inline-flex flex-col my-4 gap-2">
            <Label htmlFor="about">About you</Label>
            <Textarea placeholder="Tell us about yourself" id="about" name="about" defaultValue={data?.about} />
          </div>
          <div className="inline-flex flex-col my-4 gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea placeholder="" id="address" name="address" defaultValue={data?.address} />
          </div>
          <Button className="my-4 md:w-5/6 w-full self-center">Update your profile</Button>
        </div>
      </div>
    </div>
  )
}