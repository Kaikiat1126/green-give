import { Skeleton } from "@/components/ui/skeleton"

export default function ItemViewLoading(){
  return (
    <>
      <div className="flex flex-row items-center gap-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      <Skeleton className="h-4 w-3/4 my-2" />
      <Skeleton className="h-4 w-1/2 my-2" />
      <Skeleton className="h-4 w-1/3 my-2" />

      <Skeleton className="h-24 w-full my-2" />
      <Skeleton className="h-4 w-1/2 my-2" />
    </>
  )
}