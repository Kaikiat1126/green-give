'use client'
import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import PostCategory from "@/components/posts/post-category"

type Props = {
  category: string
  setCategory: (category: string) => void
}

export default function SelectPostCategory({ category, setCategory }: Props){
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setSelectedCategory(category)
  }, [category])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          type="button" 
          className="lg:w-1/5 sm:w-2/5 w-2/3 justify-between gap-x-2 rounded-3xl pl-6"
        >
          { category === "All" ? "Category" : category }
          <ChevronDown />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="sm:w-full w-full sm:max-w-full max-w-full p-4" hideClose>
        <div className="flex flex-col max-w-screen-md mx-auto gap-y-2">
          <div className="text-center font-semibold text-grey-1">Category</div>
          <Separator />
          <PostCategory category={selectedCategory} setCategory={setSelectedCategory} hasAll className="py-2" />
          <Button 
            type="button" 
            className="rounded-3xl h-auto py-2.5 mt-2"
            onClick={() => { 
              setCategory(selectedCategory)
              setOpen(false)
            }}
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}