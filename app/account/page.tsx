import { getUserProfile } from "../auth/get-user";
import AccountArea from "./account-area";
import ClearCache from "./clear-cache";

export default async function Account(){
  const data = await getUserProfile();

  return (
    <div className="xs:py-6 py-4 flex flex-col">
      <AccountArea data={data} />
      <ClearCache />
    </div>
  )
}