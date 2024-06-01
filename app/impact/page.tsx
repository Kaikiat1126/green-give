import { CircleHelp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Impact(){
  return (
    <div className="mx-auto md:px-8 px-6">
      <div className="xs:p-6 py-4 px-2 flex flex-col gap-y-2">
        <div className="text-xl font-semibold text-grey-1">
          You&apos;ve been joining <span className="text-[#16a34a]">GreenGive</span> for <span className="text-[#f74b70]">166</span> days!
        </div>
        <div className="inline-flex flex-col gap-y-2 py-3">
          <div className="inline-flex flex-row items-center">
            <div className="font-semibold text-grey-1">Total Impact</div>
            <CircleHelp color='#c9cdd4' className="ml-4" />
          </div>
          <div className="grid xs:grid-cols-3 grid-cols-2 gap-3">
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🙋🏻‍♀️</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">People shared with</div>
              </CardContent>
            </Card>
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🍛</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">Meal&apos;s saved</div>
              </CardContent>
            </Card>
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🚰</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">Water saved (L)</div>
              </CardContent>
            </Card>
          </div>
          <div className="text-sm text-grey-3">Water and meals are for food sharing only</div>
          <Button variant="outline" className="my-3 border-primary text-primary hover:text-white hover:bg-primary border-2 font-semibold">
            Share your impact now
          </Button>
        </div>
        <div className="inline-flex flex-col gap-y-2 py-3">
          <div className="text-center font-semibold text-xl text-grey-1">Your stats on <span className="text-[#16a34a]">GreenGive</span></div>
          <div className="grid xs:grid-cols-3 grid-cols-2 gap-3">
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🎁</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">Total activity</div>
              </CardContent>
            </Card>
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🫳</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings offered</div>
              </CardContent>
            </Card>
            <Card className="p-2 bg-[#f9f9f9]">
              <CardContent className="flex flex-col items-center p-4 py-0 gap-y-1">
                <div className="text-3xl">🫴</div>
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-grey-2 text-center whitespace-nowrap">Listings received</div>
              </CardContent>
            </Card>
          </div>
          <div className="my-2">
            <div className="font-semibold text-grey-1 text-lg">Pick-up quota count</div>
            <div className="text-grey-2 font-semibold">Last 4 weeks</div>
            <div className="inline-flex flex-col px-3 border-l-4 my-2">
              <div className="text-primary text-2xl font-semibold">0</div>
              <div className="text-grey-3 text-sm">Listings received which count towards pick-up quotas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}