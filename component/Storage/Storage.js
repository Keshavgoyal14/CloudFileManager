"use client"
import React from 'react'
import StorageInfo from "./StorageInfo"
import Userinfo from "./Userinfo"
function Storage() {
  return (
    <div className='flex flex-col p-5'>
        <Userinfo/>
        <StorageInfo/>
    </div>
  )
}

export default Storage