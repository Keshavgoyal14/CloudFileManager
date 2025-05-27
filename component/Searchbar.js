import React from 'react'
import { Input } from "@/components/ui/input"
function Searchbar({setsearch}) {
  return (
    <div >
      <Input onChange={(e)=>setsearch(e.target.value)} 
      onKeyDown={(e)=>e.key=='Enter'&& console.log(e.target.value)} type="search" placeholder="Search..." className='font-medium m-5 w-3/4' />

    </div>
  )
}

export default Searchbar