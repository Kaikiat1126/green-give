import ApproxMap from "./approx-map"

type Props = {
  location: number[]
}
export default function UserApproxLocation({location}: Props){
  return (
    <div className="flex flex-col gap-y-1.5">
      <h4 className="text-grey-1 tracking-tight scroll-m-20 font-semibold text-lg">Approx Pickup Location</h4>
      {
        location && (
          <ApproxMap 
            key="approx-map"
            lat={location[0]}
            lng={location[1]}
          />
        )
      }
      <div className="mt-1.5 text-grey-2 text-sm">
        <span className="text-grey-1">Remember:</span> There is no delivery on GreenGive. If you request this, you commit to picking up the item.
      </div>
    </div>
  )
}