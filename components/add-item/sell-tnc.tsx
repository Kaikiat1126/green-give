import { MoneyWithWings } from "../emoji"
import { Check } from 'lucide-react';
import { Button } from "../ui/button";

export default function SellTnC(){
  return (
    <div className="md:h-[60vh] h-[90vh] py-4">
      <div className="flex flex-col justify-center items-center h-full gap-y-4">
        <MoneyWithWings className="w-[3.5rem] h-[3.5rem]" />
        <h1 className="text-xl font-semibold text-grey-1">Selling on GreenGive</h1>
        <p className="my-2.5 text-center">Putting items up for sale is quick and easy. Here are the rules:</p>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row gap-x-2.5 items-center">
            <Check className="w-[1.25rem] h-[1.25rem]" />
            <div>Local collection only, so no shipping or postage</div>
          </div>
          <div className="flex flex-row gap-x-2.5 items-center">
            <Check className="w-[1.25rem] h-[1.25rem]" />
            <div>Organise your preferred payment option with your buyer</div>
          </div>
          <div className="flex flex-row gap-x-2.5 items-center">
            <Check className="w-[1.25rem] h-[1.25rem]" />
            <div>Genuine preowned items only. GreenGive can&apos;t be used to run a business!</div>
          </div>
        </div>
        <Button className="w-full md:mt-6 mt-12">I understand</Button>
      </div>
    </div>
  )
}