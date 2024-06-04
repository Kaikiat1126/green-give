import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import AddItemDrawer from "./add-item-drawer"

export default function BigScreenBottomButton(){
  return (
    <div className="fixed right-0 bottom-0 -translate-x-8 -translate-y-8">
      <AddItemDrawer>
        <div className="relative flex flex-col items-center">
          <Button variant="outline" size="icon" className="rounded-full relative bg-[#16a34a] hover:bg-[#3fb968] h-11 w-11">
            <Plus color="#fff" />
          </Button>
        </div>
      </AddItemDrawer>
    </div>
  )
}