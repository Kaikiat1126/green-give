'use client'

import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { RedApple, LoudSpeaker, Label, SpeechBallon, TeacherLightSkin } from "../emoji"
import { Button } from "@/components/ui/button"
import TnCTrigger from "./tnc-trigger"
import Modal from "./modal"
import SelectCategory from "./select-category"
import SellTnC from "./sell-tnc"
// sheets
import FullScreenSheet from "./sheet/full-screen-sheet"
import AddItemSheet from "./sheet/add-item-sheet"

type Props = {
  children: React.ReactNode
}

type ButtonList = {
  color: string
  icon: any
  rotate: number
  title: string
  description: string
  _onClick?: () => void
}[]

export default function AddItemDrawer({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState("")

  const [sheetOpen, setSheetOpen] = useState(false)
  const [categoryType, setCategoryType] = useState("")

  const buttonList: ButtonList = [
    { color: "#ffece8", icon: RedApple, rotate: 0, title: "Free", description: "Give away free food/non-food", _onClick: openSelectCategory },
    { color: "#FFFCE8", icon: Label, rotate: 45, title: "Sell", description: "Sell non-food items", _onClick: openSellTnC },
    { color: "#E8F3FF", icon: LoudSpeaker, rotate: 0, title: "Wanted", description: "Ask for something" },
    { color: "#F5E8FF", icon: SpeechBallon, rotate: 0, title: "Forum", description: "Share relevant topics with the community" }
  ]

  function openSelectCategory(): void {
    setModalType("free")
    setOpen(true)
  }

  function openSellTnC(): void {
    setModalType("sell")
    setOpen(true)
  }

  function openFullScreenSheet(): void {
    setSheetOpen(true)
  }

  const getSheetTitle = (): string => {
    if (modalType === "free") {
      return `Free ${categoryType}`
    }
    return "Sell non-food"
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col py-2">
            {
              buttonList.map((button, index) => (
                <div key={index}>
                  <Button 
                    variant="ghost" 
                    className="h-auto py-4 px-6 justify-start gap-x-4 w-full" 
                    onClick={button._onClick && button._onClick}
                  >
                    <div className="rounded-full inline-flex justify-center items-center p-2.5" style={{ backgroundColor: button.color}}>
                      <button.icon className={`w-[1.65rem] h-[1.65rem] ${button.rotate ? 'rotate-45' : ''}`} />
                    </div>
                    <div className="inline-flex flex-col items-start gap-y-1">
                      <h4 className="font-semibold text-grey-1 text-[1.05rem]">{button.title}</h4>
                      <p className="text-grey-2">{button.description}</p>
                    </div>
                  </Button>
                  <Separator className="h-[2px]" />
                </div>
              ))
            }
            <TnCTrigger>
              <Button variant="secondary" className="h-auto py-4 px-6 gap-x-4">
                <TeacherLightSkin className="w-[1.65rem] h-[1.65rem]" />
                <div className="text-grey-1 font-semibold">Help! What can I add?</div>
              </Button>
            </TnCTrigger>
          </div>
        </DrawerContent>
      </Drawer>
      <Modal 
        open={open} 
        setOpen={setOpen} 
        title={modalType === "free" ? "Select Category" : undefined}
      >
        {modalType === "free" && 
          <SelectCategory 
            openFullScreenSheet={openFullScreenSheet} 
            setCategoryType={setCategoryType}
            setOpen={setOpen}
          />
        }
        {modalType === "sell" && 
          <SellTnC 
            openFullScreenSheet={openFullScreenSheet} 
            setCategoryType={setCategoryType}
            setOpen={setOpen}
          />
        }
      </Modal>
      <FullScreenSheet 
        open={sheetOpen} 
        setOpen={setSheetOpen} 
        title={getSheetTitle()}
      >
        <AddItemSheet 
          type={categoryType}
          category={modalType}
          closeSheet={() => setSheetOpen(false)}
        />
      </FullScreenSheet>
    </>
  )
}