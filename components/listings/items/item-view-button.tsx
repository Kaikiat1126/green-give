import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { getUserId, getUserProfileLocation } from "@/app/auth/get-user";
import { removeItem } from "@/utils/removeItem";
import { addItemRequest } from "@/utils/addItemRequest";
import { upsertChat } from "@/utils/getChats";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  itemId: string;
  senderId: string;
  imagePath?: string;
  category?: string;
  sendMessage?: (chatId: string) => void;
  closeSheet: () => void;
};

export default function ItemViewButton({ itemId, senderId, imagePath, category, sendMessage, closeSheet }: Props) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const checkOwner = async () => {
      const userId = await getUserId();
      setUserId(userId!);
      if (userId === senderId) {
        setIsOwner(true);
      }
    };

    checkOwner();
  }, [itemId, senderId]);

  async function handleRemoveItem() {
    await removeItem(itemId, userId, imagePath!).then((res) => {
      if (res) {
        showToaster("Your post has been removed.", true);
      } else {
        showToaster("Failed to remove item", false);
      }
      closeSheet();
    });
  }

  async function handleRequestItem() {
    const hasLocation = await getUserProfileLocation();
    if (!hasLocation && category === "Wanted") {
      showToaster("Please update your location in your profile before continue the process", false);
      closeSheet();
      return;
    }
    await addItemRequest(itemId, userId, senderId).then((res) => {
      if (res) {
        showToaster("Your request has been sent. In processing", true);
      } else {
        showToaster("Failed to send request", false);
      }
      closeSheet();
    })
    await upsertChat(userId, senderId).then((res) => {
      if (res) {
        return res.id
      } else {
        showToaster("Failed to create chat", false)
      }
    }).then((chatId) => {
      if (chatId) sendMessage && sendMessage(chatId)
    })
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }

  if (isOwner) {
    return (
      <SubmitButton
        variant="destructive"
        className="rounded-3xl h-auto py-2.5 mt-4" 
        pendingText="Removing item..."
        onClick={handleRemoveItem}
      >
        Remove post
      </SubmitButton>
    );
  }

  if (category === "Wanted") {
    return (
      <SubmitButton
        variant="default"
        className="rounded-3xl h-auto py-2.5 mt-4"
        pendingText="Sending message..."
        onClick={handleRequestItem}
      >
        Send message
      </SubmitButton>
    );
  }

  return (
    <SubmitButton
      variant="default"
      className="rounded-3xl h-auto py-2.5 mt-4"
      pendingText="Requesting item..."
      onClick={handleRequestItem}
    >
      Request this
    </SubmitButton>
  );
}