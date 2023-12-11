'use client'

import React from 'react';
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";

interface HeroSectionProps {
  heading: string;
  message: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heading, message }) => {
  const { data }: any = useSession();
  console.log(data);

  return (
    <section id="hero">
      <div className="relative flex w-full items-center min-h-[100vh] bg-fixed bg-center bg-cover hero-img">
        {/*Overlayer*/}
        <div className='absolute h-full top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]'/>
        
        <div className='p-5 text-white z-[2] ml-[-10rem] mt-[-10rm] sm:space-y-4'>
          <div className='ml-[10rem] sm:w-[800px] sm:pl-[120px] mt-10'>
            <h2 className='text-2xl sm:text-4xl tracking-wider'>{heading}</h2>
            <p className='py-5 text-3xl font-semibold tracking-[3px] italic'>{message}</p>
            {data ? (
              <button className='px-8 py-2 border rounded-lg mt-4' onClick={() => signOut()}>
                Keluar Dari Akun Anda
              </button>
            ) : (
              <button className='px-8 py-2 border rounded-lg mt-4' onClick={() => signIn()}>
                Bergabung Bersama Kami
            </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
