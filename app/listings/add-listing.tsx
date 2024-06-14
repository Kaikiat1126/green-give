import AddItemDrawer from "@/components/add-item/add-item-drawer";
import { Button } from "@/components/ui/button";

export default function AddListing() {

  return (
    <div className="flex flex-row justify-center my-4">
      <div className="inline-flex flex-col gap-y-1.5">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Opps! There&apos;s nothing here</h4>
        <p className="text-grey-2">As soon as you start to add listings to GreenGive they will appear here</p>
        <AddItemDrawer>
          <Button className="md:mt-4 mt-2 rounded-3xl md:w-2/3 w-full self-center">Add listing</Button>
        </AddItemDrawer>
      </div>
    </div>
  )
}