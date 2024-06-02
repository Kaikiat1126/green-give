import { Clock } from "lucide-react";
import { getJoinedDate } from "@/utils/date";

type JoinedDateProps = {
  date: string;
  className?: string;
  name?: string;
}
export default function JoinedDate({date, className, name}: JoinedDateProps){
  const dateStr = getJoinedDate(date);
  return (
    <div className={"items-center gap-x-2 mt-1.5 whitespace-nowrap " + className }>
      <Clock size={20} color="#09090B" />
      <div className="text-sm text-grey-2">{name} joined <span className="font-semibold text-grey-1">{dateStr}</span></div>
    </div>
  )
}