'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const {push} = useRouter()

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email : event.target.email.value,
      fullname : event.target.fullname.value, 
      password : event.target.password.value,
    }
    const result = await fetch ('/api/auth/register', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    });
    console.log(result)

    if(result.status === 200){
      event.target.reset();
      setIsLoading(false)
      push('/login')
    } else {
      setIsLoading(false)
      setError(result.status === 400 ? "Email Telah Digunakan" : "")
    }

  }

  return (
    <div className="lg:mt-20 mt-40 flex flex-col justify-center items-center"> 

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-20">
          <h1 className="text-4xl font-bold mb-10 text-center">Daftar Akun</h1>
          {error && <p className="text-red-500">{error}</p>}

          {/* Input Nama */}
          <div className='w-[250px] sm:w-auto'>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-xl">Nama</h3>
              <input
                className="p-2 border-2 border-[#3fd592] rounded "
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Masukkan Nama Anda"
                required
              />
            </div>
            
            {/* Input Email */}
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="font-semibold text-xl">Email</h3>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="p-2 border-2 border-[#3fd592] rounded "
                placeholder="Masukkan Email Anda"
              />
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="font-semibold text-xl">Password</h3>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="p-2 border-2 border-[#3fd592] rounded "
                placeholder="Masukkan Password Anda"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4 justify-center items-center px-32">
              <div className="flex justify-center">
                <button 
                  type="submit"
                  className="bg-[#3fd592] text-center text-white p-2 py-2 px-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-2 mt-4  py-4 items-center justify-center">
        <p className="justify-center text-center items-center ">
          Sudah Punya Akun?
        </p>
        <Link href="/login">
          <button className="text-[#3fd592] hover:underline">
            Masuk
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage; 
