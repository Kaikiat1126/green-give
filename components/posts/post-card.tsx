import Image from "next/image";
import { MessageCircle, Trash } from "lucide-react";
import { Card } from "../ui/card";
import PostAuthor from "./post-author";
import { Skeleton } from "../ui/skeleton";

type Props = {
  post: any
  imageSignedUrl?: string
  imageLoading?: boolean
  showButton?: boolean
  deletePost?: () => void
  _onClick?: () => void
}

export default function PostCard({ post, imageSignedUrl, imageLoading, showButton = false, deletePost, _onClick }: Props){

  function handleDeletePost(e: any){
    deletePost && deletePost()
    e.stopPropagation()
  }

  return (
    <Card className="shadow p-4 cursor-pointer relative" onClick={_onClick}>
      <div className="flex flex-col gap-y-2">
        <PostAuthor
          userId={post?.user_id}
          category={post?.category}
          created_at={post?.created_at}
          first_name={post?.profiles?.first_name}
        />
        <div className="text-grey-1 line-clamp-3 tracking-tight leading-5">
          { post?.content }
        </div>
        {
          (post?.image && imageLoading) && (
            <Skeleton className="h-24 w-full sm:hidden" />
          )
        }
        {
          (post?.image && !imageLoading && imageSignedUrl) && (
            <div className="relative h-24 sm:hidden">
              <Image unoptimized src={imageSignedUrl} priority fill style={{objectFit:"cover"}} alt="post-image" />
            </div>
          )
        }
        <div className="flex flex-row items-center justify-end pe-2 gap-x-1 text-grey-2 mt-1">
          <MessageCircle size={18} />
          <span className="text-sm relative top-[1px]">{post?.comments.length} comments</span>
        </div>
      </div>
      {
        showButton && (
          <div 
            className="absolute top-0 right-0 m-2 p-2 rounded-full hover:bg-[#FFECE8] text-grey-3 hover:text-grey-2"
            onClick={(e) => handleDeletePost(e)}
          >
            <Trash size={16} />
          </div>
        )
      }
    </Card>
  )
}