"use client";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "@/lib/auth-client";

function Header() {
  const { data: session, isPending } = useSession();
  return (
    <header className="flex p-3 justify-between items-center border-b-2 z-10 sticky top-0 bg-background">
      <Link href="/" className="text-2xl font-bold">
        Next Js Blog
      </Link>
      <nav className={"hidden md:inline space-x-4"}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      <nav className="flex  justify-center gap-4 items-center w-10 h-10">
        {isPending ? null : session?.user ? (
          <UserMenu userInfo={session?.user} />
        ) : (
          "User"
        )}
      </nav>
    </header>
  );
}

export default Header;
