import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";
import addComment from "@/utils/addComment";

type Props = {
  postId: string
}

export default function CommentField({ postId }: Props) {

  const input = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    const response = await addComment(formData).then((data) => data)
    if(response.error) {
      showToaster(response.error, false)
      return
    }
    if (input.current) input.current.value = ""
    showToaster(response.success!, true)
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }


  return (
    <div className="h-[4.5rem]">
      <div className="fixed z-20 bottom-0 w-full py-4 pe-4 bg-white border-t max-w-screen-md mx-auto md:-translate-x-6 -translate-x-10">
        <form className="flex flex-row items-center gap-x-8 px-4">
          <Input 
            ref={input}
            name="comment"
            type="text" 
            placeholder="Leave your comment here..." 
            className="w-full border-0 rounded-lg"
            required
          />
          <Input type="hidden" value={postId} name="post_id" />
          <SubmitButton 
            key="comment-submit-button"
            variant="secondary" 
            type="button" 
            className="text-primary font-semibold rounded-3xl px-6"
            pendingText="Add..."
            formAction={handleSubmit}
          >
            Post
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}