import {
  Basket,
  BeerMug, 
  Broccoli, 
  Cigarette,
  Copyright,
  CrystalBall,
  CurrencyExchange,
  ClosedMailbox,
  Dagger,
  Deer, 
  DogFace, 
  DvD,
  Glasses,
  ThinkingFace, 
  InputNumber,
  Lipstick,
  MoneyBag,
  NoOneUnderEighteen,
  OfficeBuilding,
  Pill,
  Prohibited,
  RecyclingSymbol,
  SpiralCalendar,
  TestTube,
  Ticket,
  MoneyWithWings,
  LoudSpeaker,
  Wrench
} from "../emoji"

type ItemSection = {
  text: string;
  emoji: any
}[]

const allSections: ItemSection =  [
  { text: "All medicines including “over-the-counter”, prescription or pharmacy-approved medication, expired non-drug medical items", emoji: Pill },
  { text: "Stolen items ", emoji: MoneyBag },
  { text: "Items that other people left on the street (Unless you take them home and coordinate their collection)", emoji: Basket },
  { text: "Anything requiring postage", emoji: ClosedMailbox },
  { text: "Food that is past its use-by date", emoji: SpiralCalendar },
  { text: "Prescription glasses or contact lenses", emoji: Glasses },
  { text: "Services (tutor, dog walker, hairdresser, etc.)", emoji: CrystalBall },
  { text: "Money", emoji: MoneyBag },
  { text: "Fake or counterfeit goods", emoji: Copyright },
  { text: "Recalled products", emoji: LoudSpeaker },
  { text: "Coupons, vouchers, discount codes", emoji: MoneyWithWings },
  { text: "Tickets and experiences ", emoji: Ticket },
  { text: "Weapons & controlled items (including, but not limited to knives, solvents, weapons or fireworks)", emoji: Dagger },
  { text: "Digital content (PDF files, music, games, videos, etc.)", emoji: DvD },
  { text: "Subscriptions", emoji: SpiralCalendar },
  { text: "Homemade cosmetics", emoji: Lipstick },
  { text: "Homemade detergents and chemicals", emoji: TestTube },
  { text: "Animals, pets or animal parts (leather is OK) ", emoji: Deer },
  { text: "Violent or graphic content, sexually explicit content (nude and graphic pictures are not allowed but it's fine to share condoms, sex toys, art, etc.)", emoji: NoOneUnderEighteen },
  { text: "Banned literature/ artefacts (ivory items, nazi memorabilia, etc.)", emoji: Prohibited}
]

const saleSection: ItemSection = [
  { text: "You cannot sell as a business - only individuals can sell on GreenGive", emoji: OfficeBuilding },
  { text: "Items must be second hand - it can still be new, but no job lots", emoji: RecyclingSymbol },
  { text: "Homemade products", emoji: Wrench },
  { text: "Alcohol", emoji: BeerMug },
  { text: "Food, drink or anything edible", emoji: Broccoli },
  { text: "Pet food", emoji: DogFace },
  { text: "Tobacco/ Vape liquid/ Nicotine products", emoji: Cigarette },
  { text: "Items labeled “not for resale”", emoji: CurrencyExchange },
  { text: "Items listed for “RM123” or speculative pricing", emoji: InputNumber },
]

const wantedSection: ItemSection = [
  { text: "Non-specific requests (e.g. 'I need clothes' or 'Help needed')", emoji: ThinkingFace },
  { text: "Food", emoji: Broccoli },
]

export { allSections, saleSection, wantedSection }