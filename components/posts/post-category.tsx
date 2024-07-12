import { useMemo } from "react"
import { EmojiBackground } from "@/components/emoji/emoji-background"
import { RecyclingSymbol, SpiralCalendar, LoudSpeaker, LightBulb, PotOfFood, RedHeart, OpenHandsLightSkinTone } from "@/components/emoji/emoji"
import { Button } from "@/components/ui/button"

type Props = {
  category: string
  setCategory: (category: string) => void
  hasAll?: boolean
  className?: string
}

export default function PostCategory({ category, setCategory, hasAll, className }: Props){
  const list = [
    { title: "All", color: "#FFF7E8", emoji: OpenHandsLightSkinTone },
    { title: "Spreading The Word", color:"#e8f3ff", emoji: LoudSpeaker },
    { title: "Local Events", color:"#FFECE8", emoji: SpiralCalendar },
    { title: "Tips & Tricks", color:"#FFFCE8", emoji: LightBulb},
    { title: "Zero Waste", color: "#E8FFEA", emoji: RecyclingSymbol },
    { title: "GreenGive Experience", color:"#FFECE8", emoji: RedHeart },
    { title: "Recipes", color:"#FFE8F1", emoji: PotOfFood },
  ]

  const filteredList = useMemo(() => {
    if (hasAll) return list
    return list.slice(1)
  }, [hasAll])

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {
        filteredList.map((item) => (
          <Button 
            key={item.title}
            variant="outline" 
            type="button" 
            className={
              "flex-col gap-y-2 justify-center  whitespace-normal p-3 h-auto " + (category === item.title ? "border-[2.5px] border-primary hover:bg-inherit text-primary" : "")
            }
            onClick={() => setCategory(item.title)}
          >
            <EmojiBackground color={item.color}>
              <item.emoji className="h-6 w-6" />
            </EmojiBackground>
            <p className="text-xs text-grey-2">
              {item.title}
            </p>
          </Button>
        ))
      }
    </div>
  )
}