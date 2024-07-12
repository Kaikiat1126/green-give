import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";

type Props = {
  location: number[]
}

export default function GetLocationButton({ location }: Props) {
  
  function getLocation() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location[0]},${location[1]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        if(data.results.length === 0) {
          return;
        }
        const firstResult = data.results[0];
        const urlWithFormattedAddress = `https://www.google.com/maps/search/?api=1&query=${firstResult.formatted_address}`;
        window.open(urlWithFormattedAddress, '_blank');

        // const resultLocation = firstResult.geometry.location;
        // const placeId = firstResult.place_id;
        // const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${resultLocation.lat},${resultLocation.lng}&destination=place_id:${placeId}&travelmode=driving&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTION_API_KEY}`
        // window.open(directionUrl, '_blank');
        // window.open(`https://www.google.com/maps/search/?api=1&query=${location[0]},${location[1]}`, '_blank');
      })
  }

  return (
    <Button
      onClick={getLocation}
      className="w-full items-center"
    >
      <MapPinned size={20} />
      <span className="ml-2">Get Pickup Location</span>
    </Button>
  )
}