'use client'

import { useEffect, useState } from 'react'
import { levels_list } from '@/components/levels-badge'
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CircleHelp } from 'lucide-react'
import { getUser } from '../auth/get-user'
import { createClient } from '@/utils/supabase/client'

export default function Levels(){
  
  const [level, setLevel]: any = useState(null)
  const [points, setPoints] = useState<number>(0)
  const [nextLevel, setNextLevel]: any = useState(null)

  useEffect(() => {
    async function initUserLevel() {
      const user = await getUser()
      const userId = user?.id
      const { data } = await createClient().from('impacts').select('*').eq('id', userId).single()    
      const point = data?.points
      setPoints(point)
      const currentLevel = levels_list.filter((level) => level.points <= point).pop()
      const nextLevel = levels_list.filter((level) => level.points > point).shift()
      setNextLevel(nextLevel)
      setLevel(currentLevel)
    }
    initUserLevel()
  }, [])

  return (
    <div className="flex flex-col mx-auto gap-y-2 md:px-8 px-6">
      <div className="md:py-4 pt-8 pb-6 flex flex-col items-center gap-y-2">
        { level && <level.component />}
        <div className="text-lg text-grey-1 font-bold tracking-wide">
          { level && level.name }
        </div>
        <div className="text-sm font-bold text-[#f9cc45]">Total {points} karma points</div>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <Progress value={level? (points / nextLevel.points) * 100 : 0} 
          className='md:w-3/5 w-4/5 h-3'
          color={level? `bg-${level.color}` : ''}
        />
        <div className="text-sm mt-2 text-grey-2">
          { nextLevel ? `${nextLevel.points - points} points to ${nextLevel.name} level` : 'Congratulations! You have reached the highest level' }
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <span className=' text-lg font-bold text-grey-1'>Level</span>
        <div className='inline-flex items-center gap-x-2'>
          <CircleHelp color='#c9cdd4' />
          <span className='font-bold text-grey-1'>Karma points</span>
        </div>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:mb-0 mb-6 py-2'>
        { levels_list.map((levelObj, index) => (
          <Card key={index} className='p-3 inline-flex items-center justify-between'>
            <div className='inline-flex items-center gap-x-4'>
              <levelObj.component 
                className={level && level.points >= levelObj.points ? ' h-12 w-12' : 'opacity-40 h-12 w-12'} 
              />
              { levelObj.name }
            </div>
            <span className='text-grey-3 '>
              { levelObj.points === 0 ? 'Getting started' : levelObj.points }
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}