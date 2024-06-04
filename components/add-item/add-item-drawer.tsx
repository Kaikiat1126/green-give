'use client'

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { RedApple, LoudSpeaker, Label, SpeechBallon, TeacherLightSkin } from "../emoji"
import { Button } from "@/components/ui/button"
import TnCTrigger from "./tnc-trigger"

type Props = {
  children: React.ReactNode
}

type ButtonList = {
  color: string
  icon: any
  rotate: number
  title: string
  description: string
}[]

export default function AddItemDrawer({ children }: Props) {
  const buttonList: ButtonList = [
    { color: "#ffece8", icon: RedApple, rotate: 0, title: "Free", description: "Give away free food/non-food" },
    { color: "#FFFCE8", icon: Label, rotate: 45, title: "Sell", description: "Sell non-food items" },
    { color: "#E8F3FF", icon: LoudSpeaker, rotate: 0, title: "Wanted", description: "Ask for something" },
    { color: "#F5E8FF", icon: SpeechBallon, rotate: 0, title: "Forum", description: "Share relevant topics with the community" }
  ]
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col py-2">
          {
            buttonList.map((button, index) => (
              <div key={index}>
                <Button variant="ghost" className="h-auto py-4 px-6 justify-start gap-x-4 w-full">
                  <div className={`bg-[${button.color}] rounded-full inline-flex justify-center items-center p-2.5`}>
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
  )
}