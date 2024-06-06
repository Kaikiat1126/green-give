import { cn } from "@/lib/utils"

type Props = {
  text: string
  setType: () => void
  active: boolean
}

export default function HomeLinkBtn({ text, setType, active}: Props){
  return (
    <div 
      className={cn("text-lg font-semibold cursor-pointer text-grey-3", {
        "text-grey-1 underline underline-offset-4 decoration-2": active
      })}
      onClick={setType}
    >
      {text}
    </div>
  )
}