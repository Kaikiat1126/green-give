import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  children?: React.ReactNode
}
export default function PostImageModal({children}: Props){
  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent 
        className="p-0 border-0 rounded-none shadow-none bg-none gap-0 max-w-full sm:max-w-2xl" 
        hideClose
      >
        <div className="relative sm:h-[75vh] xs:h-[60vh] h-[50vh] w-full">
          { children }
        </div>
      </DialogContent>
    </Dialog>
  )
}