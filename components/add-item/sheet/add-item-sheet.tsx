import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import MapLocation from "./map-location"
import ImpactDrawer from "./impact-drawer"
import { UploadImage } from "./upload-image-area"
import ImagesArea from "./images-area"

import { getSelectList } from "./display-day-list"
import addItem from "@/utils/addItem"

enum typeValue {
  FOOD = "food",
  NON_FOOD = "non-food",
}
enum categoryValue {
  SELL = "sell",
  FREE = "free",
  WANTED = "wanted",
}
type Props = {
  type?: string | typeValue
  category?: string | categoryValue
  closeSheet?: () => void
}

export default function AddItemSheet({ type, category, closeSheet }: Props){

  const [images, setImages] = useState<string[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [locationExist, setLocationExist] = useState<boolean>(false)

  const select_list = getSelectList()
  const defaultSelectValue = type === typeValue.FOOD ? "5" : "28" 

  const { toast } = useToast()

  function addImage(image: string) {
    setImages([...images, image])
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  async function handleAddItem(formData: FormData) {
    if (images.length === 0) {
      showToaster("You must add an image", false)
      return
    }
    if (!locationExist) {
      showToaster("You must add your location first", false)
      return
    }
    // future: trigger user account validation
    const response = await addItem(formData)
    const success = response?.success;
    if (success) {
      showToaster(success, true)
      closeSheet && closeSheet()
    }
    else showToaster(response.error || "", false)
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }

  return (
    <form className="inline-flex flex-col gap-y-2 mb-4 w-full px-2" >
      <ImagesArea 
        images={images} 
        removeImage={removeImage}
      >
        <UploadImage images={images} addImage={addImage} />
      </ImagesArea>

      <div className="flex sm:flex-row flex-col gap-4 my-2">
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" required />
        </div>
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            name="description" 
            type="text" 
            placeholder={ category === categoryValue.WANTED ? "e.g. I'm looking for some plant plots" : "e.g 2 x tins of veg soup, XX May 2024" }
            required 
          />
        </div>
      </div>

      {
        category === categoryValue.WANTED && (
          <div className="text-sm text-grey-2 mb-1">
            👉 You can only ask for &apos;things&apos; not services (i.e. plumber, dog walker not allowed)
          </div>
        )
      }

      {
        category !== categoryValue.WANTED && (
          <div className="flex sm:flex-row flex-col sm:items-end gap-4 my-2">
            <div className="flex-1 inline-flex flex-col gap-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <ImpactDrawer />
              <div className="inline-flex flex-row xs:gap-x-2.5 gap-x-2">
                {
                  [1, 2, 3, 4, 5].map((number, index) => (
                    <Button 
                      key={index}
                      variant={number === quantity ? "default" : "secondary"} 
                      className="h-auto py-2 xs:px-8 px-5 rounded-3xl hover:bg-primary hover:text-primary-foreground transition-colors"
                      type="button"
                      onClick={() => setQuantity(number)}
                    >
                      {number}
                    </Button>
                  ))
                }
              </div>
            </div>
            <div className="flex-1">
              <Input 
                type="number" placeholder="Other" min={6} max={15} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <Input type="hidden" value={quantity} name="quantity" />
            </div>
          </div>
        )
      }

      <div className="flex sm:flex-row flex-col items-start gap-4 my-2">
        {
          category === categoryValue.SELL && (
            <div className="flex-1 inline-flex flex-col gap-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="inline-flex flex-row gap-x-2 items-center">
                <div>RM</div>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  max={500} 
                  min={1} 
                  required 
                />
              </div>
              <div className="text-xs mb-1">
                Price is for everthing in the listing and not per item. Choosing a realistic price means you&apos;re more likely to sell your item.
              </div>
            </div>
          )
        }
        <div className="flex-1 inline-flex flex-col gap-y-2 w-full">
          <Label htmlFor="pickup_instructions">Pick-up instructions</Label>
          <Textarea 
            id="pickup_instructions" 
            name="pickup_instructions" 
            placeholder={ category === categoryValue.WANTED ? "e.g. Anytime this weekend" : "e.g. 'Pick up today from 4-6pm. Please ring doorbell when here.'"}
            required 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 my-2">
        <Label htmlFor="location">Your location (approx)</Label>
        <MapLocation setLocationExist={setLocationExist} />
        <Input type="hidden" value={+locationExist} name="has_location" />
      </div>

      <div className="flex flex-col my-2 gap-y-2">
        {
          category === categoryValue.FREE || category === categoryValue.WANTED &&
          (
            <div className="flex flex-row items-center sm:justify-normal justify-between gap-4">
              <div>List for</div>
              <Select 
                name="list_for"
                defaultValue={defaultSelectValue} 
                required
              >
                <SelectTrigger className="max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      select_list().map((item, index) => (
                        <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )
        }
        {
          category === categoryValue.SELL &&
          (
            <>
              <div>All listings will be live for 28 days</div>
              <div className="p-4 rounded-xl bg-[#b3edc0] border border-[#83da9a] flex flex-col gap-y-2 mt-3">
                <h6 className="text-sm text-grey-1 font-semibold">💡 Tips for selling on GreenGive</h6>
                <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                  <li>Set a realistic price to increase your chances of selling the item</li>
                  <li>Check the guide to see what is & isn&apos;t allowed to be sold</li>
                  <li>Posting or shipping items is not allowed</li>
                </ul>
              </div>
            </>
          )
        }
        {
          type === typeValue.FOOD && (
            <p className="text-sm">👉 Food with a &quot;Use By&quot; date must be unlisted by midnight of the date.</p>
          )
        }
      </div>
      
      <Input name="category" type="hidden" value={category && category.charAt(0).toUpperCase() + category.slice(1) } />
      <Input name="type" type="hidden" value={type && type.charAt(0).toUpperCase() + type.slice(1)} />

      <Button type="submit" className="rounded-3xl h-auto py-2.5 mt-6" formAction={handleAddItem}>
        Submit
      </Button>
    </form>
  )
}