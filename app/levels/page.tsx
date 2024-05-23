'use client'

import { useEffect, useState } from 'react'
import { levels_list, Pink, Red } from '@/components/levels-badge'
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CircleHelp } from 'lucide-react'

export default function Levels(){
  return (
    <div className="flex flex-col mx-auto gap-y-2 md:px-8 px-6">
      <div className="md:py-4 pt-8 pb-6 flex flex-col items-center gap-y-2">
        <Pink />
        <div className="text-lg text-grey-1 font-bold tracking-wide">Green</div>
        <div className="text-sm font-bold text-[#f9cc45]">Total 540 karma points</div>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <Progress value={60}  className='md:w-3/5 w-4/5 h-3' />
        <div className="text-sm mt-2 text-grey-2">460 points to Blue level</div>
      </div>
      <div className='flex items-center justify-between'>
        <span className=' text-lg font-bold text-grey-1'>Level</span>
        <div className='inline-flex items-center gap-x-2'>
          <CircleHelp color='#c9cdd4' />
          <span className='font-bold text-grey-1'>Karma points</span>
        </div>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:mb-0 mb-6'>
        { levels_list.map((level, index) => (
          <Card key={index} className='p-3 inline-flex items-center justify-between'>
            <div className='inline-flex items-center gap-x-4'>
              <level.component className='h-12 w-12 opacity-40' />
              { level.name }
            </div>
            <span className='text-grey-3 '>
              { level.points === 0 ? 'Getting started' : level.points }
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}