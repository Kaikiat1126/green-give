import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPostCard() {
  return (
    <Card className="shadow p-4">
      <div className="flex flex-row items-center">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <div>
        <Skeleton className="h-3 w-1/2 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-1" />
      </div>
    </Card>
  )
}