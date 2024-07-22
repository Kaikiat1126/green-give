import { useEffect, useState, useCallback } from "react"
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getUserProfile } from "@/app/auth/get-user"
import { updateUserLocation } from '@/app/auth/update-user-data'
import useLocation from '@/utils/hooks/useLocation'
import type { Location } from '@/utils/hooks/useLocation'

type Props = {
  setLocationExist: (hasLocation: boolean) => void
}

export default function MapLocation({ setLocationExist }: Props) {
  const [position, setPosition] = useState<Location>();
  const [hasLocation, setHasLocation] = useState<boolean>(false)
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await getUserProfile()
      const data = user?.location
      if (data) {
        setPosition({ lat: data[0], lng: data[1]})
      }
    }
    fetchUserProfile()
  }, [])

  const showToast = useCallback((message?: string, title?: string, variant?: 'default' | 'destructive') => {
    toast({
      variant: variant,
      title: title,
      description: message,
    })
  }, [toast])

  const handleUpdateLocation = useCallback(async (position: {lat: number, lng: number}) => {
    await updateUserLocation(position).then((res) => {
      if ('error' in res) showToast(res.error, "Location update error", "destructive")
      if ('success' in res) showToast(res.success, "Location updated", "default")
    })
  }, [showToast])

  useEffect(() => {
    setHasLocation(true)
  }, [position, setHasLocation])

  useEffect(() => {
    setLocationExist(hasLocation)
  }, [position, hasLocation, setLocationExist])

  async function setHomeLocation(){
    if (location && 'error' in location === false) {
      setPosition(location)
      showToast("Your current location has been loaded successfully.", "Latest location", "default")
      handleUpdateLocation(location)
    }
    if (location && 'error' in location) 
      showToast(location?.error, "Location initial error", "destructive")
  }

  return (
    <>
      {
        hasLocation && position ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <div className="w-full h-[20vh]">
              <Map 
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string}
                zoom={16} 
                center={position as { lat: number, lng: number }} 
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                draggable={false}
              >
                <AdvancedMarker position={position as { lat: number, lng: number }} />
              </Map>
            </div>
          </APIProvider>
        ) : (
          <div className="flex flex-col py-2 gap-y-3">
            <div className="text-sm text-[#f53f3f]">* You haven&apos;t set your home location</div>
            <Button 
              className='py-2.5 h-auto rounded-3xl self-center sm:w-2/5 w-full'
              onClick={setHomeLocation}
            >
              Locate me & Set as pickup location
            </Button>
          </div>
        )
      }
    </>
  )
}