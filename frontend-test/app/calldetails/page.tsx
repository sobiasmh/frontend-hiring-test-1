'use client'

// import Buttons from '@/components/Button/Button'
// import Tables from '@/components/Tables'

import { Typography } from '@mui/material'
import Image from 'next/image'

export default function Table() {
  const title = ['CALL TYPE', 'DIRECTION', 'DURATION', 'FROM', 'TO', 'VIA', 'CREATED AT', 'STATUS', 'ACTIONS']

  return (
    <>
      <div className='w-full'>
        <div className='relative mb-6'>
          <div className='flex justify-between items-center p-4'>
            <div className='mt-14'>
              <Image src='/design-files/TT Logo.png' alt='TTLogo' width={470} height={60} />
            </div>
            <div className='mt-14 mr-4'>
                hello
              {/* <Buttons color='#4c44fb' text='Logout' height='51px' width='152px' radius='3px' /> */}
            </div>
          </div>
          <div className='w-full h-[2px] bg-gray-300'></div> {/* Light line */}
        </div>

        <div className='w-full'></div>
        hi
        {/* <Tables titles={title} /> */}
      </div>
    </>
  )
}
