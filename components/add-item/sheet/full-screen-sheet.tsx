import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  sheetType?: string
  title?: string
  children?: React.ReactNode
}

export default function FullScreenSheet({ open, setOpen, title, children }: Props){
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="sm:w-full w-full sm:max-w-full max-w-full p-4" hideClose>
        <div className="flex flex-col max-w-screen-md mx-auto">
          <SheetHeader className="text-left flex flex-row items-center gap-x-4">
            <Button variant="ghost" onClick={()=>setOpen(false)}><ArrowLeft /></Button>
            <SheetTitle className="text-xl py-2" style={{margin: 0}}>{title}</SheetTitle>
          </SheetHeader>
          <div data-radix-scroll-area-viewport style={{overflow: "hidden scroll"}} className="h-[92.5vh]">
            <ScrollArea className="p-4 w-auto h-full">
              { children }
            </ScrollArea>
          </div>
        </div>
      </SheetContent>   
    </Sheet>
  )
}