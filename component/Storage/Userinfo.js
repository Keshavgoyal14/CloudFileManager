import React from 'react'
import { useSession } from 'next-auth/react'
function Userinfo() {
    const { data: session } = useSession();
    console.log(session)
  return (
    <div className='flex flex-row gap-5 items-center'>
   <span> <img src={session?.user?.image} className='w-8 h-8 rounded-3xl'/></span>
   <div> <h2 className='text-md'>{session?.user.name}</h2>
    <h2 className='text-sm text-gray-500'>{session?.user.email}</h2>
    </div></div>
  )
}

export default Userinfo