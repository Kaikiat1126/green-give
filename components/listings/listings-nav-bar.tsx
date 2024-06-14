'use client'
import { Button } from "../ui/button";

type Props = {
  category?: string;
  setCategory?: (value: string) => void;
}

export default function ListingsNavBar({category = "All", setCategory}: Props){
  const buttonList = ["All", "Free", "Buy", "Wanted"];
  
  function handleActive(value: string){
    if(setCategory){
      setCategory(value)
    }
  }

  return (
    <div className="inline-flex flex-row items-center gap-x-2 my-2">
      {
        buttonList.map((item, index) => (
          <Button 
            key={index} 
            onClick={() => handleActive(item)} 
            variant={item === category ? "default" : "secondary"} 
            className="px-6 py-1.5 rounded-3xl"
          >
            {item}
          </Button>
        ))
      }
    </div>
  )
}