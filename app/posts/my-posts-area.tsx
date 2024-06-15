'use client'
import { useState, useEffect, useMemo } from "react"
import SelectPostCategory from "../community/select-category"
import PostCardContainer from "@/components/posts/post-card-container"
import PostCard from "@/components/posts/post-card"
import LoadingPostCard from "@/components/posts/loading-post-card"
import { useToast } from "@/components/ui/use-toast"
import { getUserPosts, deletePost } from "@/utils/getPosts"
import { createClient } from "@/utils/supabase/client"

export default function MyPostsArea(){

  const [category, setCategory] = useState<string>("All")
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()
  const supabase = createClient()

  const filteredPosts = useMemo(() => {
    if(category === "All") return posts
    return posts.filter((post) => post.category === category)
  }, [category, posts])

  useEffect(() => {
    setLoading(true)
    getPosts()
  }, [])

  useEffect(() => {
    const subscription = supabase
      .channel("posts_changes")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "posts",
      }, () => {
        getPosts()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [filteredPosts])

  const getPosts = async () => {
    setLoading(true)
    await getUserPosts()
      .then((data) => {
        if(data) setPosts(data)
        setLoading(false)
    })
  }

  async function handleDeletePost(postId: string){
    await deletePost(postId).then(() => {
      toast({
        title: "Post has been deleted successfully",
      })
    })
  }

  return (
    <>
      <div className="flex flex-row items-center sm:justify-normal justify-between gap-x-8">
        <h2 className="text-lg text-grey-1 font-semibold">My Posts</h2>
        <SelectPostCategory 
          category={category} 
          setCategory={setCategory}
        />
      </div>
      {
        loading && (
          <PostCardContainer>
            <LoadingPostCard key="loading-1" />
          </PostCardContainer>
        )
      }
      {
        !loading && filteredPosts.length === 0 && (
          <div key="no-post-1" className="my-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Opps! There&apos;s nothing here</h4>
            <p className="text-grey-2">As soon as you start to add post to community they will appear here</p>
          </div>
        )
      }
      {
        !loading && filteredPosts.length > 0 && (
          <PostCardContainer>
            {
              filteredPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  showButton
                  deletePost={() => handleDeletePost(post.id)}
                />
              ))
            }
          </PostCardContainer>
        )
      }
    </>
  )
}