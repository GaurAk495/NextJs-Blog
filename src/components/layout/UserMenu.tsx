import { LogOut, PencilIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ThemeButton from "../theme/themeButton";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
}

function UserMenu({ userInfo }: { userInfo: User }) {
  const username = userInfo.name;
  const router = useRouter();
  const [pending, setPending] = useState(false);
  function initalName() {
    return username[0].toUpperCase();
  }
  async function handleOnSignOut() {
    try {
      setPending(true);
      await signOut();
      router.push("/auth");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10 bg-pink-800 rounded-full cursor-pointer text-white">
        {initalName()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md w-full">
        <DropdownMenuLabel>
          <div className="py-1">
            <div>{userInfo.name}</div>
            <div className="text-gray-300 text-[13px]">{userInfo.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/profile" className="flex gap-3 items-center w-full">
            <User /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/posts/create" className="flex gap-3 items-center w-full">
            <PencilIcon />
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <ThemeButton />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleOnSignOut}
          disabled={pending}
        >
          <LogOut />
          {pending ? "Logging Out" : "Log Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
