'use client'
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import PostAuthor from "./post-author"
import { Skeleton } from "../ui/skeleton"
import { getPostById } from "@/utils/getPosts"
import { MessageCircle } from "lucide-react"

type Props = {
  postId: string
}

export default function PostView({ postId }: Props){

  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getPost = useCallback(async () => {
    await getPostById(postId)
      .then((data) => {
        if(data) setPost(data) 
        setLoading(false)
    })
  }, [postId])

  useEffect(() => {
    setLoading(true)
    getPost()
  }, [getPost])

  return (
    <div className="inline-flex flex-col gap-y-4 mb-4 w-full px-2">
      <PostAuthor
        userId={post?.user_id}
        category={post?.category}
        created_at={post?.created_at}
        first_name={post?.profiles?.first_name}
      />
      {
        loading && (
          <Skeleton className="h-3 w-1/3 my-2" />
        )
      }
      {
        !loading && (
          <>
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
        !loading && post?.image && (
          <div className="relative h-52">
            <Image src={post?.image} fill priority objectFit="cover" alt="post-image" />
          </div>
        )
      }
      <div className="my-2">
        <div className="flex flex-row items-center justify-end gap-x-1 text-grey-2">
          <MessageCircle size={18} />
          <span className="text-sm relative top-[1px]">{post?.comments.length} comments</span>
        </div>
      </div>
    </div>
  )
}