'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {

  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const signUpUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if(res?.ok) return router.push('/')
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/icons/service.png"
          alt="Service Logo"
          width={128}
          height={128}
          className="mx-auto w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign Up</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={signUpUser}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">Name</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
            <span className='text-zinc-400 text-sm'>Already have an account? Sign in <Link href="/sign-in" className='text-blue-200 underline'>here</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}
