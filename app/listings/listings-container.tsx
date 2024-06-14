'use client'
import { useState, useMemo } from "react"
import ListingsNavBar from "@/components/listings/listings-nav-bar"
import AddListing from "./add-listing"
import CardContainer from "@/components/listings/card-container"
import ItemCard from "@/components/listings/items/item-card"
import LoadingCard from "@/components/listings/items/loading-card"

type Props = {
  items: any[]
}

export default function ListingsContainer({ items }: Props) {
  const [category, setCategory] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(false)

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