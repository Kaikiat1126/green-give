import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps"

export default function AddItemSheet(){
  return (
    <div className="inline-flex flex-col gap-y-2 mb-4 w-full px-2">
      <div className="grid xs:grid-cols-3 grid-cols-2 gap-2.5"></div>
      <div className="flex sm:flex-row flex-col items-center gap-x-6 gap-y-2">
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label 
            htmlFor="input-image" 
            className="
              flex flex-col items-center justify-center p-6 cursor-pointer border-2 border-dashed bg-[#f2f3f5]
            rounded-sm hover:bg-grey-7 hover:border-grey-5 transition-colors
            "
          > 
            <Plus color="#4e5969" className="h-6 w-6 my-4" />
            <div className="text-[1.05rem] font-semibold text-grey-1 my-2 text-center whitespace-nowrap">Click to upload</div>
            <p className=" leading-6 text-grey-2 text-center mt-1 mb-4">Only png, jpg can be uploaded, and the size does not exceed 10MB</p>
          </Label>
          <Input 
            id="input-image" 
            name="items_images" 
            type="file" 
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            multiple
            required
          />
        </div>
        <div className="flex-1 text-[#f53f3f] text-sm">
          *You must add an image, maximum allowed is 3 images
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 my-2">
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" required />
        </div>
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" type="text" placeholder="e.g 2 x tins of veg soup, XX May 2024" required />
        </div>
      </div>

      <div className="flex sm:flex-row flex-col sm:items-end gap-4 my-2">
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="text-primary text-sm underline underline-offset-2">(this calculates your impact 🌏)</div>
          <div className="inline-flex flex-row xs:gap-x-2.5 gap-x-2">
            {
              [1, 2, 3, 4, 5].map((quantity, index) => (
                <Button 
                  key={index}
                  variant="secondary" 
                  className="h-auto py-2 xs:px-8 px-5 rounded-3xl hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {quantity}
                </Button>
              ))
            }
          </div>
        </div>
        <div className="flex-1">
          <Input id="quantity" name="quantity" type="number" placeholder="Other" min={6} max={15} />
        </div>
      </div>

      <div className="flex sm:flex-row flex-col items-start gap-4 my-2">
        <div className="flex-1 inline-flex flex-col gap-y-2">
          <Label htmlFor="price">Price</Label>
          <div className="inline-flex flex-row gap-x-2 items-center">
            <div>RM</div>
            <Input id="price" name="price" type="number" max={500} min={1} required />
          </div>
          <div className="text-xs mb-1">Price is for everthing in the listing and not per item. Choosing a realistic price means you&apos;re more likely to sell your item.</div>
        </div>
        <div className="flex-1 inline-flex flex-col gap-y-2 w-full">
          <Label htmlFor="pickup_instructions">Pick-up instructions</Label>
          <Textarea id="pickup_instructions" name="pickup_instructions" placeholder="e.g. 'Pick up today from 4-6pm. Please ring doorbell when here.'" required />
        </div>
      </div>

      <div className="flex flex-col gap-2 my-2">
        <Label htmlFor="location">Your location (approx)</Label>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <div className="w-full h-[20vh]">
            <Map 
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string}
                zoom={16} 
                center={{ lat: 3.139, lng: 101.6869 }} 
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                draggable={false}
            >
                <AdvancedMarker position={{ lat: 3.139, lng: 101.6869 }} />
            </Map>
          </div>
        </APIProvider>
      </div>

      <div className="flex flex-col my-2 gap-y-2">
        <div className="flex flex-row items-center sm:justify-normal justify-between gap-4">
          <div>List for</div>
          <Select>
            <SelectTrigger className="max-w-28">
              <SelectValue placeholder="5 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="28 days">28 days</SelectItem>
                <SelectItem value="14 days">14 days</SelectItem>
                <SelectItem value="7 days">7 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>All listings will be live for 28 days</div>
        <p className="text-sm">👉 Food with a &quot;Use By&quot; date must be unlisted by midnight of the date.</p>
        <div className="p-4 rounded-xl bg-[#b3edc0] border border-[#83da9a] flex flex-col gap-y-2">
          <h6 className="text-sm text-grey-1 font-semibold">💡 Tips for selling on GreenGive</h6>
          <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
            <li>Set a realistic price to increase your chances of selling the item</li>
            <li>Check the guide to see what is & isn&apos;t allowed to be sold</li>
            <li>Posting or shipping items is not allowed</li>
          </ul>
        </div>
      </div>

      <Button className="rounded-3xl h-auto py-2.5 mt-6">Submit</Button>
    </div>
  )
}