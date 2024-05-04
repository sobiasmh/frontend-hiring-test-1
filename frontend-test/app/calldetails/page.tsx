'use client'

import Buttons from '@/components/Button/Button'
// import Buttons from '@/components/Button/Button'
// import Tables from '@/components/Tables'

import { Typography } from '@mui/material'
import Image from 'next/image'
import useLogin from "../../hooks/login/useLogin";

export default function Table() {
  const title = ['CALL TYPE', 'DIRECTION', 'DURATION', 'FROM', 'TO', 'VIA', 'CREATED AT', 'STATUS', 'ACTIONS']
  const [loginFunction, loding, data] = useLogin();

  const handlePublish = async () => {
    try {
      const loginUser = await loginFunction({
        variables: {
          input: {
           username:"sob",
           password:"12345678"
          },
        },
      });
      console.log("here loginFunctionloginFunction:", loginUser);
     

     
    } catch (error) {
     
      console.log("here error testing", error);
    }
  };

  return (
    <>
      <div className='w-full'>
        <div className='relative mb-6'>
          <div className='flex justify-between items-center p-4'>
            <div className='mt-14'>
              <Image src='/design-files/TTLogo.png' alt='TTLogo' width={470} height={60} />
            </div>
            <div className='mt-14 mr-4'>
              <Buttons color='#4c44fb' text='Log out' height='51px' width='152px' radius='3px' onClick={handlePublish} />
            </div>
          </div>
          <div className='w-full h-[2px] bg-gray-300'></div> {/* Light line */}
        </div>

        <div className='w-full'></div>
        hi
      </div>
    </>
  )
}
