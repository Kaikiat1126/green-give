type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function CardContainer({children, className}: Props){
  return (
    <div className={`grid xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 py-1.5 ${className}`}>
      { children }
    </div>
  )
}