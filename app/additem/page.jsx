'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
const page = () => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [message,setMessage]=useState('')
  const adddata=async()=>{
    const res=await axios.post('/api',{
        name,price
    })
    console.log(res);
    const msg=res.data.msg;
    setMessage(msg.msg)
    setName('')
    setPrice(0)
  }
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <div id="items" className='w-[400px] h-[300px] text-black bg-blue-700 flex justify-around items-center flex-col'>
        <input 
        value={name}
        onChange={e=>setName(e.target.value)}
        type="text" placeholder='itemname'/>
        <input 
        value={price}
        onChange={e=>setPrice(e.target.value)}
        type="number" placeholder='itemprice'/>
        <button onClick={adddata}>additem</button>
        <p>{message}</p>
        {message&&<Link className='underline' href={'/'}>Go to main page</Link>}
      </div>
    </div>
  )
}

export default page