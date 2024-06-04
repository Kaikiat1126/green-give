import ListingsNavBar from "@/components/listings/nav-bar";
import { Button } from "@/components/ui/button";
import AddItemDrawer from "@/components/add-item/add-item-drawer";

export default function Listings() {
  return (
    <div className="xs:py-6 py-4 flex flex-col gap-y-2">
      <h2 className="xs:text-lg text-base scroll-m-20 text-grey-1 font-semibold">My Listings</h2>
      <ListingsNavBar />
      <div className="flex flex-row justify-center my-4">
        <div className="inline-flex flex-col gap-y-1.5">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Opps! There&apos;s nothing here</h4>
          <p className="text-grey-2">As soon as you start to add listings to GreenGive they will appear here</p>
          <AddItemDrawer>
            <Button className="md:mt-4 mt-2 rounded-3xl md:w-2/3 w-full self-center">Add listing</Button>
          </AddItemDrawer>
        </div>
      </div>
    </div>
  )
}