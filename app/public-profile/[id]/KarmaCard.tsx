import ProfileCard from "./ProfileCard";
import { levels_list } from "@/components/levels-badge";
import { cn } from "@/lib/utils";

type KarmaCardProps = {
  className?: string;
  points: number;
}

type KarmaBadgeProps = {
  children?: React.ReactNode;
  badgeColor?: string;
  badgeBg?: string;
  badgeText?: string;
}

export default function KarmaCard({className, points}: KarmaCardProps){
  const currentLevel = levels_list.filter((level) => level.points <= points).pop()
  return (
    <ProfileCard contentClass="justify-between" className={className}>
      <h3 className="text-grey-1 font-semibold">Karma points</h3>
      <div className="flex flex-row items-center gap-x-2">
        <KarmaBadge badgeText={currentLevel?.name}>
          { currentLevel && <currentLevel.component className="h-7 w-7 relative right-1" />}
        </KarmaBadge>
        {
            currentLevel?.color && 
              <KarmaBadge 
                badgeBg={`bg-${currentLevel?.color}`} 
                badgeColor={`text-${currentLevel?.color}`} 
                badgeText={`${points} Karma points`} 
              />
        }
      </div>
    </ProfileCard>
  ) 
}

export function KarmaBadge({children, badgeColor, badgeBg, badgeText}: KarmaBadgeProps){
  return (
    <div className={cn("inline-flex flex-row items-center gap-x-1.5 py-1.5 px-3 rounded-md bg-grey-7", badgeBg && `${badgeBg} bg-opacity-20`)}>
      { children }
      <div className={cn("text-sm text-grey-1", badgeColor)}>
        { badgeText }
      </div>
    </div>
  )
}