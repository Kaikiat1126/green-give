'use client'
import { useState, useEffect, useMemo } from "react"
import SelectPostCategory from "../community/select-category"
import PostCardContainer from "@/components/posts/post-card-container"
import PostCard from "@/components/posts/post-card"
import LoadingPostCard from "@/components/posts/loading-post-card"
import { useToast } from "@/components/ui/use-toast"
import { getUserPosts, deletePost } from "@/utils/getPosts"

export default function MyPostsArea(){

  const [category, setCategory] = useState<string>("All")
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    getUserPosts()
      .then((data) => {
        if(data) setPosts(data)
        setLoading(false)
      })
  }, [])

  const filteredPosts = useMemo(() => {
    if(category === "All") return posts
    return posts.filter((post) => post.category === category)
  }, [category, posts])

  async function handleDeletePost(postId: string){
    await deletePost(postId).then(() => {
      toast({
        title: "Post has been deleted successfully",
      })
      setPosts(posts.filter((post) => post.id !== postId))
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
          <div key="no-post-1" className="text-lg my-2 text-grey-3">
            You have not posted anything yet
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