import { Card, CardContent } from "@/components/ui/card";

type ProfileCardProps = {
  children: React.ReactNode;
  contentClass?: string;
  className?: string;
}

export default function ProfileCard({children, contentClass, className}: ProfileCardProps){
  return (
    <Card className={className}>
      <CardContent className={"p-4 flex flex-col gap-y-2 " + contentClass}>
        {children}
      </CardContent>
    </Card>
  )
}