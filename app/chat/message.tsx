import { getTime, formatDate } from "@/utils/date"

type Props = {
  amISender?: boolean
  message?: any
  showDate?: boolean
}

export default function Message({amISender = false, message, showDate}: Props){
  return (
    <>
      {
        showDate && 
          <div className="text-center text-grey-3 text-[0.65rem] mt-2">{formatDate(message.created_at)}</div>
      }
      <div className={`flex flex-row my-1.5 w-full ` + (amISender ? `justify-end`: ``)}>
        <div 
          className={`py-2 px-3 rounded-lg text-sm xs:max-w-[75%] max-w-[87.5%] flex flex-row flex-nowrap items-end ` + (amISender ? `bg-[#e8ffed]` : `bg-[#f7f8fa]`)}
        >
          <div>{message.message}</div>
          <p className="text-[0.65rem] text-grey-3 relative translate-y-1 xs:ms-1.5 ms-2 whitespace-nowrap">
            {getTime(message.created_at)}
          </p>
        </div>
      </div>
    </>
  )
}