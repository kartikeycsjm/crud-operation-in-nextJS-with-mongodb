'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
const page = () => {
    const params=useSearchParams();
    const id=params.get('id');
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [message,setMessage]=useState('')
  const updatedata=async()=>{
    const res=await axios.put(`/api?id=${id}`,{
        name,price
    })
    console.log(res);
    const msg=res.data.msg;
    setMessage(msg)
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
        <button onClick={updatedata}>Update</button>
        <p>{message}</p>
        {message&&<Link className='underline' href={'/'}>Go to main page</Link>}
      </div>
    </div>
  )
}

export default page