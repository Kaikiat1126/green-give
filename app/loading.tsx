export default function Loading() {
  return (
    <div className="flex items-center justify-center py-4 h-full">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
      <div className="ml-2">Loading</div>
    </div>
  )
}