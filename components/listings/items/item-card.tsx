import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  item: any;
  imageSignedUrl?: string;
  imageLoading?: boolean;
  _onClick?: () => void;
}

export default function ItemCard({item, imageSignedUrl, imageLoading, _onClick}: Props){

  return (
    <Card className="shadow cursor-pointer" onClick={_onClick}>
      <div className="flex xs:flex-col flex-row">
        <div className="relative xs:w-full w-2/5 xl:h-24 xs:h-28 h-auto rounded-t-lg">
          {
            (imageLoading) && (
              <Skeleton className="h-24 w-full" />
            )
          }
          {
            (!imageLoading && imageSignedUrl) && (
              <Image src={imageSignedUrl} fill alt="item-image" className="object-cover rounded-t-lg" priority sizes="(min-width: 475px) 100%" />
            )
          }
        </div> 
        <div className="p-4 inline-flex flex-col gap-y-2">
          <h4 className="font-semibold text-grey-1 text-[1.05rem] line-clamp-1">{item?.item_intro?.title}</h4>
          <div className="inline-flex flex-row items-center flex-nowrap gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.multiavatar.com/` + item?.user_id + `.svg`} alt="avatar" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <p className="text-grey-1 font-semibold text-sm">{item?.profiles?.username}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}