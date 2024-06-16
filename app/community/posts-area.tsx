'use client'
import { useState, useEffect } from "react"
import SelectPostCategory from "./select-category"
import PostCardContainer from "@/components/posts/post-card-container"
import PostCard from "@/components/posts/post-card"
import LoadingPostCard from "@/components/posts/loading-post-card"
import FullScreenSheet from "@/components/add-item/sheet/full-screen-sheet"
import PostView from "@/components/posts/post-view"
import { getPosts } from "@/utils/getPosts"
import { createClient } from "@/utils/supabase/client"

export default function PostsArea(){
  const [open, setOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("All")
  const [posts, setPosts] = useState<any[]>([])
  const [postsUrls, setPostsUrls] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [imagesLoading, setImagesLoading] = useState<boolean>(true)
  const [selectedPost, setSelectedPost] = useState<string>("")
  const supabase = createClient()
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const getAllPosts = async () => {
    setLoading(true)
    await getPosts({category})
      .then((data) => {
        if(data) {
          setPosts(data)
          const tempUrls = data.map((post) => {
            if(post.image) {
              return { id: post.id, image: post.image }
            }
          }) ?? []
          setPostsUrls(tempUrls.filter((url) => url !== undefined))
        }
      setLoading(false)
      setImagesLoading(true)
    })
  }

  useEffect(() => {
    setLoading(true)
    getAllPosts()
  }, [category])

  useEffect(() => {
    const handleImages = async () => {
      const tempUrls = postsUrls.map((url) => url.image)
      const { data } = await supabase.storage.from("posts_images")
        .createSignedUrls(tempUrls, 3600)
      if(data) {
        setPostsUrls(
          postsUrls.map((url, index) => {
            return { id: url.id, image: data[index].signedUrl }
          }
        ))
      }
      setImagesLoading(false)
    }
    if(postsUrls.length > 0) {
      if (timer) clearTimeout(timer)
      setTimer(setTimeout(() => {
        handleImages()
      }, 1000))
    } else {
      setImagesLoading(false)
    }
  }, [posts, supabase])

  useEffect(() => {
    const subscription = supabase
      .channel("posts_changes")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "posts",
      }, () => {
        getAllPosts()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [category, posts, supabase])

  return (
    <>
      <div className="flex flex-row items-center sm:justify-normal justify-between gap-x-8">
        <h2 className="text-lg text-grey-1 font-semibold">Posts</h2>
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
        !loading && posts.length === 0 && (
          <div key="no-post-1" className="text-lg my-2 text-grey-3">
            No posts available
          </div>
        )
      }
      {
        !loading && posts.length > 0 && (
          <PostCardContainer>
            {
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  _onClick={() => {
                    setSelectedPost(post.id)
                    setOpen(true)
                  }}
                  imageLoading={imagesLoading}
                  imageSignedUrl={
                    postsUrls.find((url) => url.id === post.id)?.image
                  }
                />
              ))
            }
          </PostCardContainer>
        )
      }
      <FullScreenSheet 
        open={open} 
        setOpen={setOpen} 
      >
        <PostView postId={selectedPost} />
      </FullScreenSheet>
    </>
  )
}