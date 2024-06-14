import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCard(){
  return (
    <Card className="shadow">
      <div className="flex xs:flex-col flex-row">
        <Skeleton  className="xs:w-full w-2/5 xl:h-24 xs:h-28 h-auto" />
        <div className="p-4 inline-flex flex-col gap-y-2 xs:w-full w-3/5">
          <Skeleton className="h-4 w-2/3" />
          <div className="inline-flex flex-row items-center flex-nowrap gap-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-1/3 xs:ml-2" />
          </div>
        </div>
      </div>
    </Card>
  )
}