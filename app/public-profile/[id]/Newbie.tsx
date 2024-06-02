import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { HatchingChick, WavingHand } from "@/components/emoji";

export default function Newbie({name}: {name: string}){
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <HatchingClickWithBackground className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="outline-none">
        <div className="p-6 md:px-10 mx-auto">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-row items-center gap-x-3">
              <HatchingClickWithBackground />
              <h3 className="text-grey-1 font-semibold">Newbie</h3>
            </div>
            <p className="leading-6 inline-flex items-center">
              {name} is a Newbie and hasn&apos;t done much GreenGiving yet. Please welcome {name} to our community! 👋🏻
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function HatchingClickWithBackground({ className }: { className?: string}){  
  return (
    <div className={`h-8 w-8 rounded-full bg-[#fcebb8] inline-flex justify-center items-center ${className}`}>
      <HatchingChick className="h-6 w-6" />
    </div>
  )
}