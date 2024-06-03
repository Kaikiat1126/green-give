import UserAvatar from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, ScanFace } from "lucide-react";
import JoinedDate from "./JoinedDate";
import ProfileCard from "./ProfileCard";
import ImpactCard from "@/app/impact/impact-card";
import { WrappedGift, Package, ClutchBag, PortableWater, Spaghetti } from "@/components/emoji";
import KarmaCard from "./KarmaCard";
import Newbie from "./Newbie";
import { Button } from "@/components/ui/button";
import { getUserProfileDataById } from "@/app/auth/get-user";

export default async function PublicProfile(
    { params: { id } }: { params: { id: string } }
){
  const data = await getUserProfileDataById(id);

  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-4">
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1">
        {data?.first_name}&apos;s profile
      </h2>
      <Separator className="xs:hidden block" />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-8">
        <div className="inline-flex flex-row gap-x-4">
          <UserAvatar className="md:h-32 md:w-32 h-28 w-28" userId={id} /> 
          <div className="inline-flex flex-col gap-y-1">
            <div className="inline-flex items-center gap-x-4">
              <h4 className="scroll-m-20 text-2xl font-semibold text-grey-1">{data?.first_name}</h4>
              <Newbie name={data?.first_name} />
            </div>
            <div className="text-grey-2">Username: {data?.username}</div>
            <div className="inline-flex flex-row items-center gap-x-2 text-grey-1">
              <ScanFace size={20} color="#09090B" />
              <span className="text-sm font-semibold">I.D: {id.split("-")[0] + "..."}</span>
            </div>
            <JoinedDate name={data?.first_name} date={data?.created_at} className="hidden xs:inline-flex" />
          </div>
        </div>
        <JoinedDate name={data?.first_name} date={data?.created_at} className="inline-flex xs:hidden" />
        <Separator className="xs:hidden block" />
        <ProfileCard>
          <h3 className="text-grey-1 font-semibold">Verified</h3>
          <div className="flex flex-row items-center gap-x-2">
            <CircleCheck color="#16a34a" size={20} />
            <span className="text-grey-2 text-sm">Email verified</span>
          </div>
        </ProfileCard>
        <KarmaCard points={data?.impacts.points} />
        <Separator className="xs:hidden block" />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:mt-3 gap-4">
        <div className="inline-flex flex-col gap-y-1.5">
          <h3 className="text-grey-1 font-semibold">About me</h3>
          <p className="text-sm xs:p-4 xs:border xs:rounded-lg xs:shadow-sm">{data?.about}</p>
        </div>
      </div>
      <div className="inline-flex flex-col gap-y-2.5 my-1.5">
        <h3 className="text-grey-1 font-semibold">{data?.first_name}&apos;s impact</h3>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
          <ImpactCard>
            <Spaghetti className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.impacts.meals_saved}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Meal&apos;s saved</div>
          </ImpactCard>
          <ImpactCard>
            <PortableWater className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.impacts.water_saved}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Water saved (L)</div>
          </ImpactCard>
          <ImpactCard>
            <WrappedGift className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.impacts.item_offers + data?.impacts.item_receives}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Total activity</div>
          </ImpactCard>
          <ImpactCard>
            <Package className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.impacts.item_offers}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings offered</div>
          </ImpactCard>
          <ImpactCard>
            <ClutchBag className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.impacts.item_receives}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings received</div>
          </ImpactCard>
        </div>
      </div>
      <Separator className="xs:hidden block" />
      <div className="flex flex-col gap-y-3 mb-2">
        <h3 className="text-grey-1 font-semibold">Listings</h3>
        <div className="inline-flex flex-row items-center gap-x-2">
          <Button className="px-5 py-1.5 rounded-full">All</Button>
          <Button variant="secondary" className="px-5 py-1.5 rounded-full">Free</Button>
          <Button variant="secondary" className="px-5 py-1.5 rounded-full">Buy</Button>
          <Button variant="secondary" className="px-5 py-1.5 rounded-full">Wanted</Button>
        </div>
        <div className="py-1.5">
          When {data?.first_name} adds a listing it will be shown here
        </div>
      </div>
    </div>
  )
}