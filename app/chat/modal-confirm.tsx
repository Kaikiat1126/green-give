import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
  
type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onClose: () => void
  onConfirm: () => void
  type: "cancel" | "confirm" | "complete"
  title: string
}

export default function ModalConfirm({ isOpen, setIsOpen, onClose, onConfirm, type, title }: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "cancel" && "Cancel Request"}
            {type === "confirm" && "Confirm Request"}
            {type === "complete" && "Complete Request"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to {type} this request - {title}?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}