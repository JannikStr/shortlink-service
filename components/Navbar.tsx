'use client';

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data: session, status } = useSession();

  if(status === 'loading') {
    return (
      <nav className="w-full flex justify-end">
        <Button variant={"default"}>
          <Skeleton className="h-2 w-12" />
        </Button>
      </nav>
    )
  }

  return (
    <nav className="w-full flex justify-end">
      { session ? (
        <Button variant='default'>Sign Out</Button>
      ) : (
        <Button>Sign In</Button>
      )}
    </nav>
  )
}
