import ListingsContainer from "./listings-container";
import { getUserId } from "../auth/get-user";
import { getItemsByUserId } from "@/utils/getItems";

export default async function Listings() {
  const userId = await getUserId();
  const items = await getItemsByUserId(userId!);

  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-2">
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My Listings</h2>
      <ListingsContainer items={items!} />
    </div>
  )
}