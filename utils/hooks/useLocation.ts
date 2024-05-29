import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number, long: number } | { error: string }>();

  const handleLocationError = (error: any) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return { error: "User denied the request for Geolocation." }
      case error.POSITION_UNAVAILABLE:
        return { error: "Location information is unavailable." }
      case error.TIMEOUT:
        return { error: "The request to get user location timed out." }
      case error.UNKNOWN_ERROR:
        return { error: "An unknown error occurred." }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, long: longitude });
      }, (error) => {
        setLocation(handleLocationError(error));
      });
    }
  }, []);
  
  return location;
}

export default useLocation;