import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/");
  }
  const user: User = session.user;
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <Card className="shadow-xl rounded-2xl p-6">
        <div className="flex items-center gap-6">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full border"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
              {user.name[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <Badge
              variant={user.emailVerified ? "default" : "secondary"}
              className="mt-2"
            >
              {user.emailVerified ? "Verified" : "Not Verified"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-sm text-gray-500">
          Joined on:{" "}
          <span className="text-black font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-6 text-right">
          <Link href="/posts/create">
            <Button>Create Post</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
