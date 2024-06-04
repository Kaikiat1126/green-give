'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import useMediaQuery from "@/utils/hooks/useMediaQuery"
import { useState } from "react"
import AddItemTnC from "./add-item-tnc"

export default function TnCTrigger({ children }: { children: React.ReactNode }){
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="left" className="sm:w-full w-full sm:max-w-full max-w-full">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl py-2">What can / can&apos;t be listed on GreenGive</SheetTitle>
          </SheetHeader>
          <div data-radix-scroll-area-viewport style={{overflow: "hidden scroll"}} className=" h-[90vh]">
            <AddItemTnC />
          </div>
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className=" max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">What can / can&apos;t be listed on GreenGive</DialogTitle>
        </DialogHeader>
        <AddItemTnC />
      </DialogContent>
    </Dialog>
  )
}