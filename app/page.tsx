'use client'

import { useEffect, useState, useMemo } from "react";
import ListingsNavBar from "@/components/listings/listings-nav-bar";
import HomeLinkBtn from "@/components/home-link-btn";
import CardContainer from "@/components/listings/card-container";
import ItemCard from "@/components/listings/items/item-card";
import LoadingCard from "@/components/listings/items/loading-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getItemsWithoutSelf } from "@/utils/getItems";

export default function Home() {
  const [type, setType] = useState<string>("Non-food")
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<any[]>([])
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    getItemsWithoutSelf({type, category})
      .then((data) => {
        if(data) setListings(data)
        setLoading(false)
      })
  }, [type, category])

  useEffect(() => {
    setCategory("All")
  }, [type])
  
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
          <ListingsNavBar category={category} setCategory={setCategory} />
        )
      }
      {
        loading && (
          <CardContainer>
            {
              Array.from({length: 3}).map((_, index) => (
                <LoadingCard key={index} />
              ))
            }
          </CardContainer>
        )
      }
      {
        !loading && listings.length > 0 && (
          <CardContainer>
            {
              listings.map((item) => (
                <ItemCard key={item.id} item={item} />
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
    </div>
  );
}
