import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { getUserId } from "@/app/auth/get-user";
import { removeItem } from "@/utils/removeItem";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  itemId: string;
  senderId: string;
  imagePath?: string;
  category?: string;
  closeSheet: () => void;
};

export default function ItemViewButton({ itemId, senderId, imagePath, category, closeSheet }: Props) {
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
    >
      Request this
    </SubmitButton>
  );
}