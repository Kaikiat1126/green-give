'use client'

import useMediaQuery from "@/utils/hooks/useMediaQuery"
import { useState } from "react"
import AddItemTnC from "./add-item-tnc"
import Modal from "./modal"

export default function TnCTrigger({ children }: { children: React.ReactNode }){
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <Modal open={open} setOpen={setOpen} title="What can / can't be listed on GreenGive" triggerChildren={children}>
      {
        isMobile && (
          <div data-radix-scroll-area-viewport style={{overflow: "hidden scroll"}} className=" h-[90vh]">
            <AddItemTnC />
          </div>
        )
      }
      {
        !isMobile && ( <AddItemTnC /> )
      }
    </Modal>
  )
}