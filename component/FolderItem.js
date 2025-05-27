import React from 'react'
import { IoFolderOpenSharp } from "react-icons/io5";
import Link from 'next/link';
function FolderItem({item}) {
    
  return (
    <Link href={`/folder/${item.id}?folder=${item.folder}`}>
    <div key={item.id} className='items-center flex flex-col justify-center m-4 hover:shadow-2xl rounded-2xl hover:cursor-pointer'>
         <IoFolderOpenSharp size={40} className='text-yellow-500'/>
         <h2>{item?.folder}</h2></div></Link>
  )
}

export default FolderItem