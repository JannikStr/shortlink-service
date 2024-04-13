'use client';

import { AddLink } from '@/components/AddLink';
import { LinkTable } from '@/components/LinkTable';
import { LinkDocument } from '@/models/Link';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession();

  const [links, setLinks] = useState<LinkDocument[]>([]);

  const updateLinks = async () => {
    const response = await fetch('/api/links', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok) return;

    const data = await response.json();
    setLinks(data);
  }

  if(status === 'unauthenticated') {
    return (
      <div className='text-white w-full text-center items-center mt-[100px]'>
        <div className='text-center'>
          <Link href="/sign-up">
            <div className='rounded-md border-white border-2 bg-zinc-900 w-36 m-auto h-8 hover:bg-zinc-800'>
              Sign Up
            </div>
          </Link>
          <Link href="/sign-in">
            <div className='rounded-md border-white border-2 bg-zinc-900 w-36 m-auto h-8 mt-3 hover:bg-zinc-800'>
              Sign In
            </div>
          </Link>
        </div>
      </div>
    )
  } else if(status === 'loading') {
    return (
      <></>
    )
  }

  updateLinks();

  return (
    <div className='text-white w-full text-center items-center mt-[100px]'>
      <h1 className='text-2xl'>Your links</h1>
      <div className='text-center items-center mx-auto w-[80%]'>
        <div className='w-full'>
          <AddLink updateLinks={updateLinks} />
        </div>
        <LinkTable userId={session?.user._id} links={links} updateLinks={updateLinks} />
      </div>
    </div>
  )
}
