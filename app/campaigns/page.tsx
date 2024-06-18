import CampaignPost from "./campaign-post"
import { Separator } from "@/components/ui/separator"

import { getCampaigns } from "@/utils/getCampaigns"

export default async function Campaigns(){
  const campaigns = await getCampaigns()

  return (
    <div className="flex flex-col max-w-screen-md mx-auto">
      <div className="xs:py-2 py-4 px-2 flex flex-col gap-y-4 mb-4">
        {
          campaigns.map((campaign, index) => (
            <div key={index}>
              <CampaignPost campaign={campaign} />
              <Separator className="my-2" />
            </div>
          ))
        }
      </div>
    </div>
  )
}