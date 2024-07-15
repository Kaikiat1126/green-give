'use client'
import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AlarmClock } from "@/components/emoji/emoji"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/ui/submit-button"
import { useToast } from "@/components/ui/use-toast"
import ModalConfirm from "./modal-confirm"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { updateItemRequest } from "@/utils/updateItemRequest"
import { updateUserImpact } from "@/app/auth/update-user-data"
import { getUserId } from "../auth/get-user"
import { useViewItemStore } from "@/utils/zustand/zustand"

type Props = {
  itemRequests: any
}

export default function RequestedItem({ itemRequests }: Props) {
  const [loading, setLoading] = useState<boolean>(true)
  const [images, setImages] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<any>({})
  const [modalType, setModalType] = useState<"cancel" | "confirm" | "complete">("confirm")
  const [userId, setUserId] = useState<string>("")
  const supabase = createClient()
  const { toast } = useToast()
  const { setViewItem } = useViewItemStore()
  const router = useRouter()

  useEffect(()=> {
    const fetchUserID = async () => {
      const userId = await getUserId()
      setUserId(userId!)
    }
    fetchUserID()
  }, [])

  useEffect(() => {
    const handleImages = async () => {
      const images = itemRequests.map((itemRequest: any) => itemRequest.items.item_intro.images[0])
      const { data } = await supabase.storage
        .from("items_images")
        .createSignedUrls(images, 1800)
      if (data) setImages(data)
      setLoading(false)
    }
    handleImages()
  }, [itemRequests])

  useEffect(() => {
    if (confirm && modalType === "cancel") {
      handleUpdateItemRequest(selectedRequest.id, selectedRequest.item_id, "Cancelled")
    }
    if (confirm && modalType === "confirm") {
      handleUpdateItemRequest(selectedRequest.id, selectedRequest.item_id, "Confirmed")
    }
    if (confirm && modalType === "complete") {
      handleUpdateItemRequest(
        selectedRequest.id, selectedRequest.item_id, "Completed",
        selectedRequest.owner_id, selectedRequest.request_user_id,
        selectedRequest.items.item_intro.quantity, selectedRequest.items.type
      )
    }
    setConfirm(false)
  }, [confirm])

  async function handleUpdateItemRequest(
    request_id: string, item_id: string, status: string,
    owner_id?: string, receiver_id?: string, quantity?: number, item_type?: string
  ) {
    await updateItemRequest(request_id, item_id, status).then((res) => {
      if (res.error) {
        showToaster(res.message, false)
      } else {
        showToaster(res.message, true)
        return true;
      }
    }).then(async (success) => {
      if (success && status === "Completed") {
        await updateUserImpact(owner_id!, receiver_id!, quantity!, item_type!).then((res) => {
          if (res.error) {
            showToaster(res.error, false)
          } else {
            showToaster(res.success ?? "", true)
          }
        })
      }
    })
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }

  function handleViewItem(item: any) {
    setViewItem(item.id, item.item_intro.title, true)
    router.push("/listings")
  }

  return (
    <>
      <Accordion type="single" collapsible>
        {
          itemRequests.map((itemRequest: any, index: any) => {
            return (
              <AccordionItem key={itemRequest.id} value={itemRequest.id} className="w-full">
                <AccordionTrigger className="w-full py-2 hover:no-underline">
                  <div className="flex flex-row items-center gap-x-2 w-full">
                    {
                      (!loading && images) && (
                        <div className="relative h-8 w-8">
                          <Image
                            priority
                            src={images[index].signedUrl}
                            alt="placeholder"
                            style={{objectFit: "cover"}}
                            fill
                          />
                        </div>
                      )
                    }
                    <div className="flex flex-col gap-y-0.5">
                      <div className="font-semibold text-grey-1 text-[0.835rem]">
                        {itemRequest.items.item_intro.title} {itemRequest.items.item_intro.price && `- RM${itemRequest.items.item_intro.price}`}
                      </div>
                      <div className="flex flex-row items-center gap-x-1">
                        <AlarmClock className="w-3 h-3" />
                        <div className="text-grey-3 text-xs">
                          {itemRequest.items.item_intro.pickup_instructions}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="w-full pb-2">
                  <div className="flex flex-row gap-x-2.5 items-center">
                    {
                      (itemRequest.owner_id === userId && itemRequest.status === "In Progress") && (
                        <UpdateRequestButton
                          text="Confirmed"
                          className="bg-[#FBE842] text-grey-1 hover:bg-[#FADC19]"
                          onClick={() => {
                            setSelectedRequest(itemRequest)
                            setModalType("confirm")
                            setIsOpen(true)
                          }}
                        />
                      )
                    }
                    {
                      (itemRequest.status === "Confirmed" && itemRequest.owner_confirmed) && (
                        <UpdateRequestButton
                          text="Completed"
                          onClick={() => {
                            setSelectedRequest(itemRequest)
                            setModalType("complete")
                            setIsOpen(true)
                          }}
                        />
                      )
                    }
                    <UpdateRequestButton
                      variant="destructive"
                      text="Cancel request"
                      onClick={() => {
                        setSelectedRequest(itemRequest)
                        setModalType("cancel")
                        setIsOpen(true)
                      }}
                    />
                    {
                      (itemRequest.items.category !== "Wanted" && itemRequest.owner_id !== userId) || 
                      (itemRequest.items.category === "Wanted" && itemRequest.owner_id === userId) && 
                      (itemRequest.status === "Confirmed") &&
                      (
                        <Button 
                          className="h-auto text-xs py-1.5 bg-[#FF9A2E] hover:bg-[#FF7D00] text-white"
                          onClick={() => handleViewItem(itemRequest.items)}
                        >
                          View Item
                        </Button>
                      )
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })
        }
      </Accordion>
      <ModalConfirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          setConfirm(true)
          setIsOpen(false)
        }}
        type={modalType}
        title={selectedRequest?.items?.item_intro?.title}
      />
    </>
  )
}

type ButtonProps = {
  variant?: "destructive" | "default"
  className?: string
  onClick: () => void
  text: string
}

export function UpdateRequestButton({ variant = "default", text, onClick, className }: ButtonProps) {
  return (
    <SubmitButton
      variant={variant}
      className={`h-auto text-xs py-1.5 ${className}`}
      pendingText="Processing..."
      onClick={onClick}
    >
      {text}
    </SubmitButton>
  )
}