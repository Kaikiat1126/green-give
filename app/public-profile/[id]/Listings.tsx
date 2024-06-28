'use client'
import { useEffect, useState, useMemo } from "react";
import ListingsNavBar from "@/components/listings/listings-nav-bar";
import CardContainer from "@/components/listings/card-container";
import ItemCard from "@/components/listings/items/item-card";
import LoadingCard from "@/components/listings/items/loading-card";
import { getItemsByUserId } from "@/utils/getItems";
import { createClient } from "@/utils/supabase/client";
import FullScreenSheet from "@/components/add-item/sheet/full-screen-sheet";
import ItemView from "@/components/listings/items/item-view";

type Props = {
  first_name?: string;
  userId?: string;
}

export default function Listings({ first_name, userId }: Props){
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<any[]>([])
  const [itemsUrls, setItemsUrls] = useState<any[]>([])
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const supabase = createClient()

  useEffect(() => {
    setLoading(true)
    getItemsByUserId(userId!)
      .then((data) => {
        if(data) {
          setListings(data)
          setItemsUrls(data.map((item) => { return { id: item.id, image: item.item_intro.images[0] } }))
        }
        setLoading(false)
        setImageLoading(true)
      })
  }, [userId])

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
      handleImages()
    } else {
      setImageLoading(false)
    }
  }, [listings])

  const filteredItems = useMemo(() => {
    if (category === "All") return listings
    return listings.filter((item) => item.category === category)
  }, [category, listings])

  return (
    <>
      <div className="flex flex-col gap-y-3 mb-2">
        <h3 className="text-grey-1 font-semibold">Listings</h3>
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
                    _onClick={() => {
                      setOpen(true)
                      setSelectedItem(item.id)
                      setTitle(item.item_intro.title)
                    }}
                    imageLoading={imageLoading}
                    imageSignedUrl={itemsUrls.find((url) => url.id === item.id)?.image}
                  />
                ))
              }
            </CardContainer>
          )
        }
        {
          !loading && filteredItems.length === 0 && (
            <div className="py-1.5">
              When {first_name} adds a listing it will be shown here
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
          closeSheet={() => setOpen(false)}
        />
      </FullScreenSheet>
    </>
  )
}