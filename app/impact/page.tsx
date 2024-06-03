import { getUserImpacts, getUserJoinedDays } from "../auth/get-user";
import ShareImpact from "./share-impact";
import ImpactSheet from "./impact-sheet";
import ImpactCard from "./impact-card";
import { WomanRaisingHand, Spaghetti, PortableWater, WrappedGift, Package, ClutchBag } from "@/components/emoji";

export default async function Impact(){

  const data = await getUserImpacts();
  const joinedDays = await getUserJoinedDays();

  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-2">
      <div className="text-xl font-semibold text-grey-1">
        You&apos;ve been joining <span className="text-[#16a34a]">GreenGive</span> for <span className="text-[#f74b70]">{joinedDays}</span> days!
      </div>
      <div className="inline-flex flex-col gap-y-2 py-3">
        <div className="inline-flex flex-row items-center">
          <div className="font-semibold text-grey-1">Total Impact</div>
          <ImpactSheet />
        </div>
        <div className="grid xs:grid-cols-3 grid-cols-2 gap-3">
          <ImpactCard>
            <WomanRaisingHand className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.item_offers + data?.item_receives}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">People shared with</div>
          </ImpactCard>
          <ImpactCard>
            <Spaghetti className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.meals_saved}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Meal&apos;s saved</div>
          </ImpactCard>
          <ImpactCard>
            <PortableWater className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.water_saved}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Water saved (L)</div>
          </ImpactCard>
        </div>
        <div className="text-sm text-grey-3">Water and meals are for food sharing only</div>
        <ShareImpact meals_saved={data?.meals_saved} water_saved={data?.water_saved}  />
      </div>
      <div className="inline-flex flex-col gap-y-2 py-3">
        <div className="text-center font-semibold text-xl text-grey-1">Your stats on <span className="text-[#16a34a]">GreenGive</span></div>
        <div className="grid xs:grid-cols-3 grid-cols-2 gap-3">
          <ImpactCard>
            <WrappedGift className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.item_offers + data?.item_receives}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Total activity</div>
          </ImpactCard>
          <ImpactCard>
            <Package className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.item_offers}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings offered</div>
          </ImpactCard>
          <ImpactCard>
            <ClutchBag className="h-7 w-7 mt-1.5" />
            <div className="text-xl font-bold">{data?.item_receives}</div>
            <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings received</div>
          </ImpactCard>
        </div>
        <div className="my-2">
          <div className="font-semibold text-grey-1 text-lg">Pick-up quota count</div>
          <div className="text-grey-2 font-semibold">Last 4 weeks</div>
          <div className="inline-flex flex-col px-3 border-l-4 my-2">
            <div className="text-primary text-2xl font-semibold">0</div>
            <div className="text-grey-3 text-sm">Listings received which count towards pick-up quotas</div>
          </div>
        </div>
      </div>
    </div>
  )
}