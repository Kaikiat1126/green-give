import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Image from "next/image"

type Props = {
  imgUrl: string
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ItemImageModal({imgUrl, open, setOpen}: Props){
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="p-0 border-0 rounded-none shadow-none bg-none gap-0 max-w-full sm:max-w-2xl" 
        hideClose
      >
        <div className="relative sm:min-h-[75vh] xs:min-h-[60vh] min-h-[50vh] h-full w-full">
          <Image src={imgUrl} fill priority style={{objectFit:"cover"}} alt="item-image" />
        </div>
      </DialogContent>
    </Dialog>
  )  
}