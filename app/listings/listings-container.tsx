'use client'
import { useState, useMemo, useEffect, useCallback } from "react"
import ListingsNavBar from "@/components/listings/listings-nav-bar"
import AddListing from "./add-listing"
import CardContainer from "@/components/listings/card-container"
import ItemCard from "@/components/listings/items/item-card"
import LoadingCard from "@/components/listings/items/loading-card"
import { getItemsByUserId } from "@/utils/getItems";
import { createClient } from "@/utils/supabase/client"
import FullScreenSheet from "@/components/add-item/sheet/full-screen-sheet"
import ItemView from "@/components/listings/items/item-view"

type Props = {
  userId: string
}

export default function ListingsContainer({ userId }: Props) {

  //for full screen sheet
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [items, setItems] = useState<any[]>([])
  const [itemsUrls, setItemsUrls] = useState<any[]>([])
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const supabase = createClient()

  const getUserItems = useCallback(async () => {
    setLoading(true)
    await getItemsByUserId(userId)
      .then((data) => {
        if(data) {
          setItems(data)
          setItemsUrls(data.map((item) => { return { id: item.id, image: item.item_intro.images[0] } }))
          setImageLoading(true)
        }
        setLoading(false)
    })
  }, [userId])

  useEffect(() => {
    getUserItems()
  }, [userId, getUserItems])

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
    if(itemsUrls.length > 0) {
      if (timer) clearTimeout(timer)
      setTimer(setTimeout(() => {
        handleImages()
      }, 1000))
    } else {
      setImageLoading(false)
    }
  }, [items])

  useEffect(() => {
    const subscription = supabase
      .channel("items_changes")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "items",
      }, () => {
        getUserItems()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [userId, items, getUserItems, supabase])

  const filteredItems = useMemo(() => {
    if (category === "All") return items
    return items.filter((item) => item.category === category)
  }, [category, items])

  return (
    <>
      <ListingsNavBar category={category} setCategory={setCategory} />
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
        !loading && filteredItems.length > 0 && (
          <CardContainer>
            {
              filteredItems.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  imageLoading={imageLoading}
                  imageSignedUrl={itemsUrls.find((url) => url.id === item.id)?.image}
                  _onClick={() => {
                    setOpen(true)
                    setSelectedItem(item.id)
                    setTitle(item.item_intro.title)
                  }}
                />
              ))
            }
          </CardContainer>
        )
      }
      {
        !loading && filteredItems.length === 0 && (
          <AddListing />
        )
      }
      <FullScreenSheet
        open={open}
        setOpen={setOpen}
        title={title}
      >
        <ItemView itemId={selectedItem} />
      </FullScreenSheet>
    </>
  )
}