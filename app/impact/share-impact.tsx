'use client'

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";

export default function ShareImpact({meals_saved, water_saved}: {meals_saved: any, water_saved: any}){

  const { toast } = useToast()

  const handleShareImpact = async () => {
    await navigator.clipboard.writeText(`I have shared ${meals_saved} meals and saved ${water_saved}L of water on GreenGive - why not join me to stop #foodwaste at greengive.vercel.app 💦🙌`)
    await navigator.share({
      title: 'Share your impact on GreenGive',
      text: `I have shared ${meals_saved} meals and saved ${water_saved}L of water on GreenGive - why not join me to stop #foodwaste at greengive.vercel.app 💦🙌`,
      url: 'https://greengive.vercel.app/',
    })
    .then(() => createToast('Successfully shared your impact!', false))
    // .catch(() => createToast('An error occurred while sharing your impact!', true));
  }

  const createToast = (message: string, error: boolean) => {
    toast({
      title: message,
      variant: error ? 'destructive' : 'default',
    })
  }

  return (
    <Button 
      variant="outline" 
      className="my-3 border-primary text-primary hover:text-white hover:bg-primary border-2 font-semibold"
      onClick={handleShareImpact}
    >
      Share your impact now
    </Button>
  )
}