import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CircleHelp } from "lucide-react"

export default async function ImpactSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CircleHelp color='#c9cdd4' className="ml-4 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="xs:w-3/4 w-full xs:max-w-sm max-w-full">
        <div className="inline-flex flex-col gap-y-6 py-4">
          <div className="inline-flex flex-col gap-y-2">
            <h4 className="font-semibold tracking-tight scroll-m-20">How do you calculate “Meals saved”?</h4>
            <p>Meals saved is calculated when you give away a food listing. The average personal food item has been estimated to contain <span className="text-[#f74b70]">0.774 (or 77.4%)</span> of a meal, </p>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              <li>We&apos;ve considered a meal to be <span className="text-[#f74b70]">0.42 kg (420g)</span> of food </li>
              <li>On average, each item in a personal GreenGive food listing contains <span className="text-[#f74b70]">0.325kg (325g)</span> of food</li>
            </ul>
          </div>
          <div className="inline-flex flex-col gap-y-2">
            <h4 className="font-semibold tracking-tight scroll-m-20">How do you calculate “Water saved”?</h4>
            <p>By saving food, we also save the water that was used to grow and process that food. Based on data from a WRAP report &quot;The water and carbon footprint of household food and drink waste in the UK&quot;, the average personal food item requires <span className="text-[#f74b70]">196 litres</span> of water (this is calculated via sampling analysis). </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}