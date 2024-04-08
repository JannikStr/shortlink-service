'use client';

import { pageLinks } from '@/constants'
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

export default function Sidebar() {

  const { data: session } = useSession();

  return (
    <section className="bg-zinc-800 flex flex-1 flex-col max-w-[64px] md:max-w-[128px] h-full gap-3 mt-4 py-4 px-3 rounded-r">
      {pageLinks.map((link) => {
        return (
          <Link
            key={link.label}
            href={link.route}
          >
            <div className='flex flex-row'>
              <Image
                alt={`icon-${link.label}`}
                src={link.icon}
                width={24}
                height={24}
                className='invert'
              />
              <span className='text-white text-xl hidden md:flex pl-2'>{link.label}</span>
            </div>
          </Link>
        );
      })}
      {session?.user ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn('credentials')}>Sign In</Button>
      )}
    </section>
  )
}
