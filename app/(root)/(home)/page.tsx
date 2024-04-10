'use client';

import { AddLink } from '@/components/AddLink';
import { LinkTable } from '@/components/LinkTable';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if(status === 'unauthenticated') {
    return router.push('/sign-in')
  }

  return (
    <div className='text-white w-full text-center items-center mt-[200px]'>
      <h1 className='text-2xl'>Your links</h1>
      <div className='text-center items-center mx-auto w-[80%]'>
        <div className='w-full'>
          <AddLink />
        </div>
        <LinkTable userId={session?.user._id}/>
      </div>
    </div>
  )
}
