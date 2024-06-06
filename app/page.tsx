'use client'

import { useState } from "react";
import ListingsNavBar from "@/components/listings/nav-bar";
import HomeLinkBtn from "@/components/home-link-btn";

export default function Home() {
  const [type, setType] = useState<string>("non-food")
  const [category, setCategory] = useState<string>("")

  return (
    <div className="xs:py-2 py-4 flex flex-col gap-y-2">
      <div className="flex flex-row items-center gap-x-5 mt-2">
        <HomeLinkBtn text="Food" setType={() => setType("food")} active={type === "food"} />
        <HomeLinkBtn text="Non-food" setType={() => setType("non-food")} active={type === "non-food"} />
      </div>
      {
        type === "non-food" && (
          <ListingsNavBar />
        )
      }
    </div>
  );
}
