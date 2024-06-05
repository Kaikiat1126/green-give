'use client'

import useMediaQuery from "@/utils/hooks/useMediaQuery"
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
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

type Props = {
  title?: string | undefined
  triggerChildren?: React.ReactNode
  children?: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Modal({ title, triggerChildren, children, open, setOpen }: Props) {

  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        {
          triggerChildren && (
            <SheetTrigger asChild>
              {triggerChildren}
            </SheetTrigger>
          )
        }
        <SheetContent side="left" className="sm:w-full w-full sm:max-w-full max-w-full">
          { 
            title && (
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl py-2">{title}</SheetTitle>
              </SheetHeader>
            )
          }
          { children }
        </SheetContent>   
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {
        triggerChildren && (
          <DialogTrigger asChild>
            {triggerChildren}
          </DialogTrigger>
        )
      }
      <DialogContent className=" max-w-xl">
        {
          title && (
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
            </DialogHeader>
          )
        }
        { children }
      </DialogContent>
    </Dialog>
  )
}