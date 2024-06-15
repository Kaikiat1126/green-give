'use client'
import { useState, useMemo, useEffect, useCallback } from "react"
import ListingsNavBar from "@/components/listings/listings-nav-bar"
import AddListing from "./add-listing"
import CardContainer from "@/components/listings/card-container"
import ItemCard from "@/components/listings/items/item-card"
import LoadingCard from "@/components/listings/items/loading-card"
import { getItemsByUserId } from "@/utils/getItems";
import { createClient } from "@/utils/supabase/client"

type Props = {
  userId: string
}

export default function ListingsContainer({ userId }: Props) {
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<any[]>([])

  const supabase = createClient()

  const getUserItems = useCallback(async () => {
    setLoading(true)
    await getItemsByUserId(userId)
      .then((data) => {
        if(data) setItems(data)
        setLoading(false)
    })
  }, [userId])

  useEffect(() => {
    getUserItems()
  }, [userId, getUserItems])

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
                <ItemCard key={item.id} item={item} />
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
    </>
  )
}