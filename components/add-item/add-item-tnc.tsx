import { ScrollArea } from "@/components/ui/scroll-area"
import { allSections, saleSection, wantedSection } from "./sections"
import { Broccoli, RollerSkate } from "../emoji"

export default function AddItemTnC(){
  return (
    <ScrollArea className="py-2 md:max-h-[75vh] max-h-auto w-auto">
      <div className="flex flex-col gap-y-2 mb-4">
        <h3 className="font-semibold text-lg text-grey-1">What you can list on GreenGive</h3>
        <div className="inline-flex flex-col gap-y-4 my-4">
          <EmojiWithText bold text="Free food & drink"><Broccoli className="h-5 w-5" /></EmojiWithText>
          <p>No matter if it&apos;s loose, raw, cooked, opened, unopened, or past its best-before date (but never past its use-by date). </p>
          <ul className="ml-6 list-disc [&>li]:mt-2">
            <li>Alcohol - It&apos;s your responsibility to ID check requesters</li>
            <li>Baby formula</li>
            <li>Supplements & vitamins</li>
          </ul>
          <blockquote className="my-2 border-l-2 pl-4 italic">
            NOTE: while alcohol, baby formulas, and supplements/vitamins are perfectly fine to be shared as personal items on GreenGive, we do not have permission to collect and share these items from businesses with the Food Waste Hero Programme.
          </blockquote>
        </div>
        <div className="inline-flex flex-col gap-y-4 my-4">
          <EmojiWithText bold text="Free Non Food"><RollerSkate className="h-5 w-5" /></EmojiWithText>
          <p>You can give, lend or sell your stuff but, please, put it in the correct section (don&apos;t sell stuff in the free part 🤬). There are guidelines but, generally speaking, if you think someone can put it to good use then it&apos;s okay to list on GreenGive.</p>
          <ul className="ml-6 list-disc [&>li]:mt-2">
            <li>Kitchen knives (not designed as weapons) - It&apos;s your responsibility to ID check requesters</li>
            <li>Used cosmetics - Within date, go for it</li>
            <li>Pet food - Lucky pup</li>
            <li>Non-drug medical items, new/sealed (face masks, lancets, pregnancy tests, first aid kits)</li>
          </ul>
        </div>
        <h3 className="font-semibold text-lg text-grey-1 mt-4">What you cannot list on GreenGive</h3>
        <div className="flex flex-col gap-y-1.5 mb-4">
          <h4 className="text-grey-1 font-semibold">All sections</h4>
          {
            allSections.map((section, index) => (
              <EmojiWithText key={index} text={section.text}>
                <section.emoji className="h-5 w-5" />
              </EmojiWithText>
            ))
          }
        </div>
        <div className="flex flex-col gap-y-1.5 mb-4">
          <h4 className="text-grey-1 font-semibold">For sale section</h4>
          <p className="mb-1.5">There are some things you can give for free but can&apos;t sell. This often relates to local licensing requirements, including:</p>
          {
            saleSection.map((section, index) => (
              <EmojiWithText key={index} text={section.text}>
                <section.emoji className="h-5 w-5" />
              </EmojiWithText>
            ))
          }
        </div>
        <div className="flex flex-col gap-y-1.5 md:mb-2 mb-4">
          <h4 className="text-grey-1 font-semibold mb-2">Wanted</h4>
          {
            wantedSection.map((section, index) => (
              <EmojiWithText key={index} text={section.text}>
                <section.emoji className="h-5 w-5" />
              </EmojiWithText>
            ))
          }
        </div>
      </div>
    </ScrollArea>
  )
}

function EmojiWithText({ children, text, bold }: { children?: React.ReactElement, text: string, bold?: boolean }) {
  return (
    <div className="inline-flex flex-row items-center gap-x-2.5">
      { children }
      <p className={bold ? "font-semibold flex-1": "flex-1"}>{text}</p>
    </div>
  )
}