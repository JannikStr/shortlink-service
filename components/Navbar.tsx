'use client';

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { FaMask } from "react-icons/fa";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-end pr-3 pt-2 text-white ">
      { session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-zinc-950" variant="outline"><FaMask /><span className="pl-2">Profile</span></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Button onClick={() => signOut()}>Log Out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <></>
      )}
    </nav>
  )
}
