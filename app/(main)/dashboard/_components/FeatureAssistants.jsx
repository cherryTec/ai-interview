"use client"

import React from 'react'
import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import { ExpertsList } from '@/services/Option'
import  Image  from 'next/image'
import UserInputDialog from './UserInputDialog'

function FeatureAssistants() {
   const user= useUser();
   console.log('user',user)
   console.log('ExpertsList',ExpertsList)
  return (
    <div>
      <div className='flex justify-between items-center'>
          <div>
              <h2 className='font-medium text-gray-500'>My Workspace</h2>
              <h2 className='text-3xl font-bold'>Welcome back {user?.displayName}</h2>
          </div>
          <Button>Profile</Button>
       </div>

       <div   className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-10 mt-10'>
         
              {ExpertsList.map((option,index) =>(
                
                  <div key={index} className='p-2 bg-secondary rounded-3xl flex flex-col justify-center items-center '>
                  
                    <UserInputDialog coachingOption={option}>
                      <div className='flex flex-col justify-center items-center'>
                        <Image src={option.icon} alt={option.name}  width={150} height={150} className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all' />
                        <h2 className='mt-2'>{option.name} </h2>
                      </div>
                    </UserInputDialog>
                  </div>
               
              ))}
          </div>
   </div>

  )
}

export default FeatureAssistants