import { MoneyWithWings } from "../emoji/emoji"
import { Check } from 'lucide-react';
import { Button } from "../ui/button";

type Props = {
  openFullScreenSheet: () => void
  setCategoryType: (categoryType: string) => void
  setOpen: (open: boolean) => void
}

export default function SellTnC({ openFullScreenSheet, setCategoryType, setOpen }: Props){

  function handleSelectCategory() {
    setOpen(false)
    openFullScreenSheet()
    setCategoryType("non-food")
  }

  const tnc = [
    "Local collection only, so no shipping or postage",
    "Organise your preferred payment option with your buyer",
    "Genuine preowned items only. GreenGive can't be used to run a business!"
  ]

  return (
    <div className="md:h-[60vh] h-[90vh] py-4">
      <div className="flex flex-col justify-center items-center h-full gap-y-4">
        <MoneyWithWings className="w-[3.5rem] h-[3.5rem]" />
        <h1 className="text-xl font-semibold text-grey-1">Selling on GreenGive</h1>
        <p className="my-2.5 text-center">Putting items up for sale is quick and easy. Here are the rules:</p>
        <div className="flex flex-col gap-y-2">
          {
            tnc.map((t, index) => {
              return (
                <div key={index} className="flex flex-row gap-x-2.5 items-center">
                  <Check className="w-[1.25rem] h-[1.25rem]" />
                  <div>{t}</div>
                </div>
              )
            })
          }
        </div>
        <Button className="w-full md:mt-6 mt-12" onClick={handleSelectCategory}>
          I understand
        </Button>
      </div>
    </div>
  )
}