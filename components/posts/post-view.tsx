'use client'
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import PostAuthor from "./post-author"
import Comment from "./comment/comment"
import CommentField from "./comment/comment-field"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"
import { getPostById } from "@/utils/getPosts"
import { MessageCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

type Props = {
  postId: string
}

export default function PostView({ postId }: Props){

  const [post, setPost] = useState<any>(null)
  const [imageSignedUrl, setImageSignedUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClient()

  const getPost = useCallback(async () => {
    await getPostById(postId)
      .then((data) => {
        if(data) setPost(data) 
    })
  }, [postId])
  
  useEffect(() => {
    const handleImages = async () => {
      const { data } = await supabase.storage.from("posts_images")
        .createSignedUrl(post?.image, 3600)
      if(data) {
        setImageSignedUrl(data.signedUrl)
        setLoading(false)
      }
    }
    if(post?.image) {
      handleImages()
    } else {
      setLoading(false)
    }
  }, [post])

  useEffect(() => {
    setLoading(true)
    getPost()
  }, [getPost])

  //build subscription to comments table to update comments in real-time with post_id
  useEffect(() => {
    const subscription = supabase
      .channel(`comments_changes:${postId}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "comments",
      }, () => {
        getPost()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [post, postId, getPost, supabase])

  return (
    <div className="inline-flex flex-col gap-y-3 mb-4 w-full px-2">
      {
        loading && (
          <>
            <div className="flex flex-row items-center gap-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-3 w-1/3 my-2" />
          </>
        )
      }
      {
        !loading && (
          <>
            <PostAuthor
              userId={post?.user_id}
              category={post?.category}
              created_at={post?.created_at}
              first_name={post?.profiles?.first_name}
            />
            <div className="my-2 text-grey-1 tracking-tight leading-5">
              { post?.content }
            </div>
            {
              post?.link && (
                <div className="text-primary underline text-sm whitespace-nowrap line-clamp-1">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.link}
                  </a>
                </div>
              )
            }
          </>
        )
      }
      {
        !loading && imageSignedUrl && (
          <div className="relative h-52">
            <Image src={imageSignedUrl} fill priority style={{objectFit:"cover"}} alt="post-image" />
          </div>
        )
      }
      <div className="my-1">
        <div className="flex flex-row items-center justify-end gap-x-1 text-grey-2">
          <MessageCircle size={18} />
          <span className="text-sm relative top-[1px]">{post?.comments.length} comments</span>
        </div>
        <Separator className="mt-4" />
      </div>

      <div className="flex flex-col">
        {
          post?.comments.map((comment: any) => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
      </div>

      <CommentField key="comment-field" postId={post?.id} />
    </div>
  )
}