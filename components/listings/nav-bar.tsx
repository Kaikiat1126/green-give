'use client'
import { useState } from "react";
import { Button } from "../ui/button";

export default function ListingsNavBar(){
  const [active, setActive] = useState<string>("All");
  const buttonList = ["All", "Free", "Buy", "Wanted"];
  
  function handleActive(value: string){
    setActive(value);
  }

  return (
    <div className="inline-flex flex-row items-center gap-x-2 my-2">
      {
        buttonList.map((item, index) => (
          <Button 
            key={index} 
            onClick={() => handleActive(item)} 
            variant={item === active ? "default" : "secondary"} 
            className="px-6 py-1.5 rounded-3xl"
          >
            {item}
          </Button>
        ))
      }
    </div>
  )
}