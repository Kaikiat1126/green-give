import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps"
import { Circle } from "@/components/maps/circle"

type Props = {
  lat: number
  lng: number
}

export default function ApproxMap({ lat, lng }: Props){
  return (
    location && 'error' in location === false ? (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <div className="w-full h-[25vh]">
          <Map 
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string}
            defaultZoom={14} 
            defaultCenter={{ lat: lat, lng: lng }} 
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <Circle 
              center={{ lat: lat, lng: lng }} 
              radius={300} 
              strokeColor={'#16a34a'}
              strokeWeight={3}
              fillOpacity={0.3}
              fillColor={'#16a34a'}
            />
          </Map>
        </div>
      </APIProvider>
    ):
    null
  )
}