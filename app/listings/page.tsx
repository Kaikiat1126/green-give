import ListingsContainer from "./listings-container";
import RequestedItems from "./requested_items";
import { Separator } from "@/components/ui/separator";
import { getUserId } from "../auth/get-user";

export default async function Listings() {
  const userId = await getUserId();

  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-2">
      <RequestedItems />
      <Separator className="mb-2" />
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My Listings</h2>
      <ListingsContainer userId={userId!} />
    </div>
  )
}