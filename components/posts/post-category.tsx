import { EmojiBackground } from "@/components/emoji/emoji-background"
import { RecyclingSymbol, SpiralCalendar, LoudSpeaker, LightBulb, PotOfFood, RedHeart } from "@/components/emoji/emoji"
import { Button } from "@/components/ui/button"

type Props = {
  category: string
  setCategory: (category: string) => void
  hasAll?: boolean
}

export default function PostCategory({ category, setCategory, hasAll }: Props){
  const list = [
    { title: "Spreading The Word", value: "Spreading", color:"#e8f3ff", emoji: LoudSpeaker },
    { title: "Local Events", value: "Events", color:"#FFECE8", emoji: SpiralCalendar },
    { title: "Tips & Tricks", value: "Tips", color:"#FFFCE8", emoji: LightBulb},
    { title: "Zero Waste", value: "Zero Waste", color: "#E8FFEA", emoji: RecyclingSymbol },
    { title: "GreenGive Love", value: "Love", color:"#FFECE8", emoji: RedHeart },
    { title: "Recipes", value: "Recipes", color:"#FFE8F1", emoji: PotOfFood },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {
        list.map((button, index) => (
          <Button 
            key={index}
            variant="outline" 
            type="button" 
            className={
              "flex-col gap-y-2 justify-center  whitespace-normal p-3 h-auto " + (category === button.value ? "border-[2.5px] border-primary hover:bg-inherit text-primary" : "")
            }
            onClick={() => setCategory(button.value)}
          >
            <EmojiBackground color={button.color}>
              <button.emoji className="h-6 w-6" />
            </EmojiBackground>
            <p className="text-xs text-grey-2">
              {button.title}
            </p>
          </Button>
        ))
      }
    </div>
  )
}