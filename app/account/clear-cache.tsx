'use client'

import { Button } from "@/components/ui/button"

export default function ClearCache(){
  const clearSiteCache = () => {
    if (typeof window !== 'undefined') {
      self.caches.keys().then(function(names) {
        for (let name of names)
          self.caches.delete(name);
      });
      window.location.reload();
    }
  }

  return (
    <Button variant="secondary" className="md:w-2/3 w-full self-center my-3" onClick={clearSiteCache}>
      Clear cached data
    </Button>
  )
}