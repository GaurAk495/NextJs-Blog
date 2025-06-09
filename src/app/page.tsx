import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const res = await headers();
  const session = await auth.api.getSession({
    headers: res,
  });

  if (!session) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen">
        <p className="text-4xl font-bold">Welcome To Blogy Post</p>
        <Button>
          <Link href="/auth">Get Started</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <p className="text-4xl font-bold">Welcome To Blogy Post</p>
      <Button>
        <Link href="/profile">Get Started</Link>
      </Button>
      {session && <p> Welcome {session?.user.name} 😎</p>}
    </div>
  );
}
