import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RedApple, TeddyBear } from "../emoji/emoji"

type Props = {
  openFullScreenSheet: () => void
  setCategoryType: (categoryType: string) => void
  setOpen: (open: boolean) => void
}

export default function SelectCategory({ openFullScreenSheet, setCategoryType, setOpen }: Props){
  const buttonList = [
    { color: "#ffece8", icon: RedApple, title: "Food", description: "Give away anything you would eat yourself" },
    { color: "#ffe8fb", icon: TeddyBear, title: "Non-food", description: "Give away toiletries, cosmetrics, kitchen utensils, toys, clothes etc" },
  ]
  
  function handleSelectCategory(categoryType: string) {
    setOpen(false)
    openFullScreenSheet()
    setCategoryType(categoryType.toLowerCase())
  }

  return (
    <div className="inline-flex flex-col w-full">
      <Separator className="h-[2px]" />
      {
        buttonList.map((button, index) => (
          <div key={index}>
            <Button 
              variant="ghost" 
              className="h-auto py-4 justify-start gap-x-4 whitespace-normal w-full xs:px-4 px-3"
              onClick={() => handleSelectCategory(button.title)} 
            >
              <div className="rounded-full inline-flex justify-center items-center p-2.5" style={{ backgroundColor: button.color}}>
                <button.icon className="w-[1.65rem] h-[1.65rem]" />
              </div>
              <div className="inline-flex flex-col items-start gap-y-1">
                <h4 className="font-semibold text-grey-1 text-[1.05rem]">{button.title}</h4>
                <div className="text-grey-2 text-left">{button.description}</div>
              </div>
            </Button>
            <Separator className="h-[2px]" />
          </div>
        ))
      }
    </div>
  )
}