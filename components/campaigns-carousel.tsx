'use client'
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton";
import { getHomeCampaigns } from "@/utils/getCampaigns";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CampaignsCarousel(){
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [imageLoading, setImageLoading] = useState<Boolean>(false);
  const [signedUrls, setSignedUrls] = useState<any[]>([]);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchCampagins(){
      const results = await getHomeCampaigns();
      if(results) {
        setCampaigns(results)
        setSignedUrls(results.map((campaign) => {
          return { id: campaign.id, image: campaign.images[0] }
        }))
        setImageLoading(true);
      }
      setLoading(false)
    }
    fetchCampagins();
  }, [])

  useEffect(() => {
    const handleImages = async () => {
      const tempUrls = signedUrls.map(url => url.image)
      const { data } = await supabase.storage.from("campaigns_images")
        .createSignedUrls(tempUrls, 3600)
      if(data) {
        setSignedUrls(
          signedUrls.map((url, index) => {
            return { id: url.id, image: data[index].signedUrl }
          })
        )
      }
      setImageLoading(false)
    }
    if(imageLoading) handleImages()
  }, [campaigns])

  return (
    <div className="flex flex-col items-center gap-y-2 mb-2">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full max-w-[1536px] max-h-[25vh]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {
            (loading || imageLoading) && (
              <CarouselItem>
                <Skeleton className="w-full h-[25vh] bg-gray-100"></Skeleton>
              </CarouselItem>
            )
          }
          { 
            (!loading && !imageLoading) && campaigns.map((campaign) => 
              (
                <CarouselItem key={campaign.id}>
                  <ImageItem 
                    url={signedUrls.find(url => url.id === campaign.id).image}
                    campaign={campaign}
                    _onClick={() => router.push(`/campaigns`)}
                  />
                </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export function ImageItem(
  {url, campaign, _onClick}: {url: string, campaign: any, _onClick: () => void}
) {
  const [show, setShow] = useState<Boolean>(false);
  return (
    <div 
      className="relative w-full h-[25vh] cursor-pointer"
      onClick={_onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image 
        unoptimized
        src={url} 
        alt="campaign-image" fill priority 
        style={{objectFit: 'cover'}} 
      />
      {
        show && (
          <div className="absolute w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center gap-y-2">
            <h1 className="text-white text-lg font-semibold">{campaign.title}</h1>
          </div>
        )
      }
    </div>
  )
}