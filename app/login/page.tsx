'use client';

import React from "react";
import { useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const Page = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState("")

  const handleLogin = async (e : any) => {
    e.preventDefault()
    try{
      const res = await signIn("credentials", {
        redirect : false,
        email : e.target.email.value,
        password : e.target.password.value,
        callbackUrl : "/"
      })
      if(!res?.error){
        push("/")
      } else {
        console.log(res.error)
      }
    } catch (err){
      console.log(err)
    }
  }




  return (
    <div className="lg:mt-20 mt-40 flex flex-col justify-center container "> 
      <div className="flex flex-col sm:px-20">
      {error && <p className="text-red-500">{error}</p>}
        <h1 className="text-4xl font-bold mb-10 text-center">Login</h1>
        <form className="flex justify-center items-center flex-col gap-4" onSubmit={handleLogin}>
        <div className='w-[250px] sm:w-[400px]'>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-xl">Email</h3>
              <input
                className="p-2 border-2 border-[#3fd592] rounded "
                type="email"
                id="email" 
                name="email"
                placeholder="Masukkan Email Anda"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="font-semibold text-xl">Password</h3>
              <input
                className="p-2 border-2 border-[#3fd592] rounded "
                type="password" 
                id="password" 
                name="password"
                placeholder="Masukkan Password Anda"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4 justify-center items-center px-32">
              <div className="flex justify-center">
                <button 
                  className="bg-[#3fd592] text-center text-white p-2 py-2 px-10"
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading?"Loading...":"Login"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-2 mt-4 border-b border-black py-4">
          <button className="text-[#3fd592] hover:underline">
            Lupa Password?
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4  py-4">
          <p className="justify-center text-center items-center ">
            Belum Punya Akun ?
          </p>
          <a href="/register" className="text-[#3fd592] text-center hover:underline">
            Daftar Akun
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
