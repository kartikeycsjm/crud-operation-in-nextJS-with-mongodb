'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const page = () => {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const router = useRouter()
  const getdata = async () => {
    const res = await axios.get('/api');
    const data = res.data;
    setItems(data.items)
    console.log(data);
  }
  const del = async (id) => {
    try {
      const res = await axios.delete(`/api?id=${id}`);
      const msg = res.data.msg;
      setMessage(msg);
      getdata();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <div id="items" className='w-[400px] min-h-[300px] bg-blue-700 flex justify-around items-center flex-col'>
        {items&&items.map((item, index) => {
          return (
            <div key={index} id="item" className='border w-full h-[70px] flex justify-around items-center'>
              <div className='w-[60%]flex flex-col justify-center items-center'>
                <h1>{item.name}</h1>
                <h2>{item.price}</h2>
              </div>
              <div id="buttons" className='w-[30%] flex justify-around items-center'>
                <button className='bg-black p-1' onClick={()=>del(item._id)}>Delete</button>
                <button className='bg-black p-1' onClick={()=>router.push(`/update?id=${item._id}`)}>Edit</button>
              </div>
            </div>
          )
        }
        )}
      </div>
      <button onClick={() => router.push('/additem')}>Add items</button>
    </div>
  )
}

export default page