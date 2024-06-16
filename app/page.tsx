'use client'

import { useEffect, useState, useMemo, useCallback } from "react";
import ListingsNavBar from "@/components/listings/listings-nav-bar";
import HomeLinkBtn from "@/components/home-link-btn";
import CardContainer from "@/components/listings/card-container";
import ItemCard from "@/components/listings/items/item-card";
import LoadingCard from "@/components/listings/items/loading-card";
import FullScreenSheet from "@/components/add-item/sheet/full-screen-sheet";
import ItemView from "@/components/listings/items/item-view";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getItemsWithoutSelf } from "@/utils/getItems";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<string>("Non-food")
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<any[]>([])
  const [itemsUrls, setItemsUrls] = useState<any[]>([])
  const [search, setSearch] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const supabase = createClient()

  const handleGetItems = useCallback(async () => {
    setLoading(true)
    await getItemsWithoutSelf({type, category})
      .then((data) => {
        if(data) {
          setListings(data)
          setItemsUrls(data.map((item) => { return { id: item.id, image: item.item_intro.images[0] } }))
        }
        setLoading(false)
        setImageLoading(true)
    })
  }, [type, category])

  useEffect(() => {
    handleGetItems()
  }, [type, category, handleGetItems])

  useEffect(() => {
    setCategory("All")
  }, [type])

  useEffect(() => {
    const subscription = supabase
      .channel("items_changes")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "items",
      }, () => {
        handleGetItems()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [type, category, listings, handleGetItems, supabase])

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
  }, [listings])
  
  return (
    <div className="xs:py-2 py-4 flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between mt-2">
        <div className="flex flex-row items-center gap-x-5">
          <HomeLinkBtn text="Food" setType={() => setType("Food")} active={type === "Food"} />
          <HomeLinkBtn text="Non-food" setType={() => setType("Non-food")} active={type === "Non-food"} />
        </div>
        <div className="inline-flex md:w-1/5 w-2/5 relative">
          <Input
            placeholder="Search"
            type="search"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-grey-3" size={16} />
        </div>
      </div>
      {
        type === "Non-food" && (
          <ListingsNavBar key="listing-nav-bar" category={category} setCategory={setCategory} />
        )
      }
      {
        loading && (
          <CardContainer>
            {
              Array.from({length: 2}).map((_, index) => (
                <LoadingCard key={`loading-${index}`} />
              ))
            }
          </CardContainer>
        )
      }
      {
        !loading && listings.length > 0 && (
          <CardContainer className="mb-4">
            {
              listings.map((item) => (
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
        !loading && listings.length === 0 && (
          <div className="text-center my-2 xs:text-xl text-lg font-semibold text-grey-3">
            No listings available right now
          </div>
        )
      }
      <FullScreenSheet
        open={open}
        setOpen={setOpen}
        title={title}
      >
        <ItemView itemId={selectedItem} />
      </FullScreenSheet>
    </div>
  );
}
