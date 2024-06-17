type Props = {
  category: string
}
enum categoryValue {
  SELL = "Sell",
  FREE = "Free",
  WANTED = "Wanted",
}
export default function CategoryNotice({category}: Props){
  return (
    <div className="my-2 py-4 px-6 bg-[#E8FFEA] rounded-xl">
      {
        category === categoryValue.FREE ? (
          <>
            <div className="text-grey-1">Everything in this section is given away for <span className="text-primary font-semibold">free 💚</span>.</div>
            <div className="text-grey-1">Strictly no selling, no swaps, no donations</div>
          </> 
        ) : (category === categoryValue.WANTED ? (
          <>
            <div className="text-grey-1">Everything in this section is wanted by someone.</div>
            <div className="text-grey-1">If you have it, you can help</div>
          </>
        ) : (
          <>
            <div className="text-grey-1">Local collection only, no shipping or postage.</div>
            <div className="text-grey-1">You may need to organise your preferred payment option with the seller.</div>
          </>
        ))
      }
    </div>
  )
}