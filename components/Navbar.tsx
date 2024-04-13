'use client';

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-end pr-3 pt-2 text-white ">
      { session ? (
        <Button onClick={() => signOut()} variant="destructive">Sign Out</Button>
      ) : (
        <></>
      )}
    </nav>
  )
}
