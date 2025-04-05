import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'

function AppHeader() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center'>
        <Image src={'/logo.svg'} alt='logo' width={60} height={40}/>

        <UserButton />
     
    </div>
  )
}

export default AppHeader