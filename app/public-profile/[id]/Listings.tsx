'use client'
import { useEffect, useState, useMemo } from "react";
import ListingsNavBar from "@/components/listings/listings-nav-bar";
import CardContainer from "@/components/listings/card-container";
import ItemCard from "@/components/listings/items/item-card";
import LoadingCard from "@/components/listings/items/loading-card";
import { getItemsByUserId } from "@/utils/getItems";

type Props = {
  first_name?: string;
  userId?: string;
}

export default function Listings({ first_name, userId }: Props){
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    getItemsByUserId(userId!)
      .then((data) => {
        if(data) setListings(data)
        setLoading(false)
      })
  }, [userId])

  const filteredItems = useMemo(() => {
    if (category === "All") return listings
    return listings.filter((item) => item.category === category)
  }, [category, listings])

  return (
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
                <ItemCard key={item.id} item={item} />
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
  )
}