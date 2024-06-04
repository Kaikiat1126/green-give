'use client'
import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps"
import { Circle } from '@/components/maps/circle'
import { Button } from '@/components/ui/button'
import { LocateFixed } from 'lucide-react'
import { getUserProfile } from '../auth/get-user'
import { updateUserLocation } from '../auth/update-user-data'
import useLocation from '@/utils/hooks/useLocation'
import type { Location } from '@/utils/hooks/useLocation'
import { useToast } from "@/components/ui/use-toast"

export default function Location(){
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
        showToast("Your home location has been loaded successfully.", "Latest home location", "default")
      }
    }
    fetchUserProfile()
  }, [])

  useEffect(() => {
    setHasLocation(true)
  }, [position])

  function showToast(message?: string, title?: string, variant?: 'default' | 'destructive') {
    toast({
        variant: variant,
        title: title,
        description: message,
    })
  }

  async function useCurrentLocation() {
    if (location && 'error' in location === false) {
      setPosition(location)
      showToast("Your current location has been loaded successfully.", "Latest location", "default")
    }
    if (location && 'error' in location) 
      showToast(location?.error, "Location initial error", "destructive")
  }

  async function setHomeLocation(){
    if (position) {
      await updateUserLocation(position)
    }
  }

  return (
    <div className="xs:py-2 py-4 flex flex-col gap-y-2">
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My location</h2>
      {
        hasLocation && position ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <div className='md:h-[77.5vh] h-[69vh] relative'>
              <Map 
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string}
                defaultZoom={16} 
                defaultCenter={position as { lat: number, lng: number }} 
                gestureHandling={'cooperative'}
                disableDefaultUI={true}
              >
                <AdvancedMarker position={position as { lat: number, lng: number }} />
                <Circle 
                  center={position as { lat: number, lng: number }} 
                  radius={300} 
                  strokeColor={'#16a34a'}
                  strokeWeight={3}
                  fillOpacity={0.3}
                  fillColor={'#16a34a'}
                />
              </Map>
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 mb-2'>
                <div className='flex flex-col gap-y-2'>
                  <Button 
                    variant="outline" 
                    className='rounded-3xl text-primary font-semibold hover:text-primary' 
                    onClick={useCurrentLocation}
                  >
                    <LocateFixed color='#16a34a' className='mr-2 w-6 h-6'/>
                    Locate me
                  </Button>
                  <Button className='px-14 py-2.5 h-auto rounded-3xl' onClick={setHomeLocation}>Set home location</Button>
                </div>
              </div>
            </div>
          </APIProvider>
        ) : 
        (
          <>
            <p className="text-grey-2 text-center my-4 mt-8">
              No location data found, please add and save your home location.
            </p>
            <div className='flex flex-row justify-center mt-2'>
              <Button 
                variant="outline" 
                className='rounded-3xl h-auto sm:px-14 sm:w-auto w-full py-2.5 text-primary font-semibold hover:text-primary' 
                onClick={useCurrentLocation}
              >
                <LocateFixed color='#16a34a' className='mr-2 w-6 h-6'/>
                Use my current location
              </Button>
            </div>
          </>
        )
      }
    </div>
  )
}