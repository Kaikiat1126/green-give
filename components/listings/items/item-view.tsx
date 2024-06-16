'use client'
import { useState, useEffect, useCallback } from "react"
import ItemSender from "./item-sender"
import ApproxMap from "./approx-map"
import ItemViewLoading from "./item-view-loading"
import { getItemById } from "@/utils/getItems"

type Props = {
  itemId: string
}

export default function ItemView({ itemId }: Props){
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  const getItem = useCallback(async () => {
    setLoading(true)
    await getItemById(itemId)
      .then((data) => {
        if(data) setItem(data)
        setLoading(false)
    })
  }, [itemId])

  useEffect(() => {
    getItem()
  }, [getItem])

  return (
    <div className="inline-flex flex-col gap-y-4 mb-4 w-full px-2">
      {
        loading ? (
          <ItemViewLoading />
        ) : (
          <>
            <ItemSender 
              userId={item?.user_id}
              created_at={item?.created_at}
              first_name={item?.profiles?.first_name}
              title={item?.item_intro.title}
            />
            <div className="my-2">
              { item?.item_intro.description }
            </div>
            <div className="flex flex-col gap-y-1">
              <h4 className="text-grey-1 tracking-tight scroll-m-20 font-semibold text-lg">Pick-up instructions</h4>
              <div className="text-grey-2 text-sm">
                { item?.item_intro.pickup_instructions }
              </div>
            </div>
            <div className="my-2 py-4 px-6 bg-[#E8FFEA] rounded-xl">
              <div className="text-grey-1">Everything in this section is given away for <span className="text-primary font-semibold">free 💚</span>.</div>
              <div className="text-grey-1">Strictly no selling, no swaps, no donations</div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h4 className="text-grey-1 tracking-tight scroll-m-20 font-semibold text-lg">Approx Location</h4>
              {
                item?.profiles?.location && (
                  <ApproxMap 
                    lat={item?.profiles?.location[0]}
                    lng={item?.profiles?.location[1]}
                  />
                )
              }
              <div className="mt-1.5 text-grey-2 text-sm">
                <span className="text-grey-1">Remember:</span> There is no delivery on GreenGive. If you request this, you commit to picking up the item.
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}