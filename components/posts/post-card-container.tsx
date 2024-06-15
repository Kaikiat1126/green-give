type Props = {
  children: React.ReactNode;
}
  
export default function PostCardContainer({children}: Props){
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-1.5">
      { children }
    </div>
  )
}