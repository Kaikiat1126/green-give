type Props = {
  children: React.ReactNode
  color?: string
  className?: string
}

export function EmojiBackground({ children, color, className }: Props) {
  return (
    <div 
      style={{ backgroundColor: color }}
      className={`p-2.5 rounded-full inline-flex justify-center items-center ${className}`}
    >
      { children }
    </div>
  )
}