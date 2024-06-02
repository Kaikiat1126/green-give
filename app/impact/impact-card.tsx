import { Card, CardContent } from "@/components/ui/card";

export default function ImpactCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-2 bg-[#f9f9f9]">
      <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
        {children}
      </CardContent>
    </Card>
  )
}