'use client'
import { useState, useEffect, useCallback } from "react";
import CardContainer from "@/components/listings/card-container"
import ItemCard from "@/components/listings/items/item-card"
import LoadingCard from "@/components/listings/items/loading-card"
import FullScreenSheet from "@/components/add-item/sheet/full-screen-sheet";
import ItemView from "@/components/listings/items/item-view";
import { getUserRequestedItems } from "@/utils/getItemRequest";
import { createClient } from "@/utils/supabase/client";
import { useViewItemStore } from "@/utils/zustand/zustand";

export default function RequestedItems() {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [items, setItems] = useState<any[]>([])
  const [itemsUrls, setItemsUrls] = useState<any[]>([])

  const supabase = createClient()
  const { resetStore } = useViewItemStore()

  const getUserItems = useCallback(async () => {
    setLoading(true)
    await getUserRequestedItems()
      .then((data) => {
        if(data) {   
          setItems(data)
          setItemsUrls(data.map((item) => { return { id: item.id, image: item.items.item_intro.images[0] }}))
          setImageLoading(true)
        }
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getUserItems()
  }, [])

  useEffect(() => {
    const storeState = useViewItemStore.getState()
    if(storeState.open) {
      setOpen(storeState.open)
      setSelectedItem(storeState.itemId)
      setTitle(storeState.title)
    }
  }, [])

  useEffect(() => {
    const handleImages = async () => {
      const tempUrls = itemsUrls.map((url) => url.image)
      const { data } = await supabase.storage.from("items_images")
        .createSignedUrls(tempUrls, 3600)
      if(data) {
        setItemsUrls(
          itemsUrls.map((url, index) => {
            return { id: url.id, image: data[index].signedUrl }
          }
        ))
      }
      setImageLoading(false)
    }
    handleImages()
  }, [items])

  function handleClose() {
    setOpen(false)
    resetStore()
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 mb-2">
        <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My Requested Listings</h2>
        {
          loading && (
            <CardContainer>
              {
                Array.from({length: 2}).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              }
            </CardContainer>
          )
        }
        {
        !loading && items.length > 0 && (
          <CardContainer>
            {
              items.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item.items} 
                  imageLoading={imageLoading}
                  imageSignedUrl={itemsUrls.find((url) => url.id === item.id)?.image}
                  _onClick={() => {
                    setOpen(true)
                    setSelectedItem(item.item_id)
                    setTitle(item.items.item_intro.title)
                  }}
                />
              ))
            }
          </CardContainer>
        )
      }
        {
        !loading && items.length === 0 && (
          <div className="flex flex-col gapy-1.5 my-2">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center text-grey-2">Opps! There&apos;s nothing here</h4>
            <p className="text-grey-2 text-center">As soon as you request any item on GreenGive they will appear here</p>
          </div>
        )
      }
      </div>
      <FullScreenSheet 
        open={open} 
        setOpen={setOpen} 
        title={title}
      >
        <ItemView 
          itemId={selectedItem} 
          closeSheet={handleClose} 
          getLocation={true}
        />
      </FullScreenSheet>
    </>
  )
}