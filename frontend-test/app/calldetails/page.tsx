'use client'

import Buttons from '@/components/Button/Button'
import CallTable from '@/components/CallTable/CallTable'
import { Typography } from '@mui/material'
import Image from 'next/image'

export default function Table() {
  const title = ['CALL TYPE', 'DIRECTION', 'DURATION', 'FROM', 'TO', 'VIA', 'CREATED AT', 'STATUS', 'ACTIONS']
 

  return (
    <>
      <div className='w-full'>

        <div className='w-full'></div>
        <CallTable titles={title} />
      </div>
    </>
  )
}
