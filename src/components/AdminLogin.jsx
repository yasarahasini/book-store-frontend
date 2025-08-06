import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import getBaseUrl from '../utils/baseURL'
import axios from "axios"
import { useNavigate } from 'react-router-dom'



const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

     const navigate = useNavigate()

      const onSubmit = async (data) => {
         console.log(data)
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            const auth = response.data;
            console.log(auth)
            if(auth.token){
                localStorage.setItem('token', auth.token);
                setTimeout(() =>{
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.')
                navigate("/")
                
                },3600 * 1000
            )
            }
         alert("Admin Login successful!")
         navigate("/dashboard")
            
          //navigate("/")
          
        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
      }
  return (
    <div className='flex items-center justify-center h-screen '>
        <div className='w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>Admin Dashboard Login </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor="username">Username</label>
                    <input 
                    {...register("username", { required: true })} 
                    type="text" name="username" id="username" placeholder='username'
                    className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })} 
                    type="password" name="password" id="password" placeholder='Password'
                    className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow'
                    />
                </div>
                {
                    message && <p className='mb-3 text-xs italic text-red-500'>{message}</p>
                }
                <div className='w-full'>
                    <button className='w-full px-8 py-2 font-bold text-white bg-pink-500 rounded hover:bg-blue-700 focus:outline-none'>Login </button>
                </div>
            </form>

            <p className='mt-5 text-xs text-center text-gray-500'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

export default AdminLogin