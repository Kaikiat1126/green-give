import ListingsContainer from "./listings-container";
import { getUserId } from "../auth/get-user";

export default async function Listings() {
  const userId = await getUserId();

  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-2">
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My Listings</h2>
      <ListingsContainer userId={userId!} />
    </div>
  )
}