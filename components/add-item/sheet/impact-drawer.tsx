import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
 
export default function ImpactDrawer(){
  return (
    <Drawer>
      <DrawerTrigger className="w-fit">
        <div className="text-primary text-sm underline underline-offset-2 text-left">(this calculates your impact 🌏)</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-y-3 p-4 max-w-screen-md mx-auto">
          <h3 className="font-semibold text-grey-1 text-[1.05rem]">Quantity</h3>
          <p className="leading-6">To calculate your impact - and GreenGive&apos;s - we need to know the quantity being given away.</p>
          <div className="inline-flex flex-col gap-y-">
            <div>A bag of apples 🍎 = 1</div>
            <div>A pack of biscuits 🍪 = 1</div>
            <div>A shampoo 🧴 + a conditioner 🧴= 2</div>
            <div>3 sandwiches 🥪 = 3</div>
          </div>
          <div>⚠️ Note: the quantity is not shown on your listing</div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}