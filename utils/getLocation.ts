'use client'

export default function getLocation(){
  if (typeof window !== "undefined" && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const response = { sucess: true, lat: latitude, long: longitude }
      // console.log(response);
      return response
    }, (error) => {
      return handleLocationError(error);
    });
  }
}

export function handleLocationError(error: any) {
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
}