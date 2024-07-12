'use client'
import { useState, useEffect, useCallback } from "react"
import ItemSender from "./item-sender"
import ItemCarousel from "./item-carousel"
import ItemViewButton from "./item-view-button"
import UserApproxLocation from "./user-approx-location"
import CategoryNotice from "./category-notice"
import ItemViewLoading from "./item-view-loading"
import GetLocationButton from "./get-location-button"
import { getItemById } from "@/utils/getItems"
import { addMessage } from "@/utils/addMessage"
import { useRouter } from "next/navigation"
import { isExpired } from "@/utils/calculateExpiry"

type Props = {
  itemId: string
  closeSheet?: () => void
  getLocation?: boolean
}

export default function ItemView({ itemId, closeSheet, getLocation }: Props){
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  
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

  async function messageToOwner(chatId: string){
    //send a message to the owner
    let message = "";
    if (item?.category === "Wanted") {
      message = `Hi, I have the item you are looking for - ${item?.item_intro?.title}. Can we discuss more?`
    } else {
      message = `Hi, I'm interested in your item - ${item?.item_intro?.title}. Can we discuss more?`
    }
    await addMessage(chatId, message).then(() => {
      router.push(`/chat/${chatId}`)
    })
  }

  return (
    <div className="inline-flex flex-col gap-y-4 mb-4 w-full px-2">
      {
        loading ? (
          <ItemViewLoading />
        ) : (
          <>
            <div className="flex flex-row justify-center">
              <ItemCarousel images={item?.item_intro.images} />
            </div>
            <ItemSender 
              userId={item?.user_id}
              created_at={item?.created_at}
              first_name={item?.profiles?.first_name}
              title={item?.item_intro.title}
              category={item?.category}
              price={item?.item_intro.price}
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
            <CategoryNotice category={item?.category} />
            {
              item?.category !== "Wanted" && (
                <UserApproxLocation key="user-approx-location" location={ item?.profiles?.location} />
              )
            }
            {
              (getLocation && item?.available) && (
                <GetLocationButton key="get-location-button" location={item?.profiles?.location} />
              )
            }
            {
              (
                !item?.requested_by && 
                !isExpired(item?.item_intro?.expiry_on)
              ) && (
                <ItemViewButton 
                  key="item-view-button" 
                  itemId={item?.id} 
                  senderId={item?.user_id} 
                  imagePath={item?.item_intro.images[item?.item_intro.images.length - 1]}
                  category={item?.category}
                  sendMessage={messageToOwner}
                  closeSheet={() => closeSheet && closeSheet()}
                />
              )
            }
            {
              isExpired(item?.item_intro?.expiry_on) && item?.available && (
                <div className="mt-4">
                  <p className="text-primary text-center underline text-lg">This item has expired.</p>
                </div>
              )
            }
            {
              !item?.available && (
                <div className="mt-4">
                  <p className="text-primary text-center underline text-lg">This item is no longer available.</p>
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}