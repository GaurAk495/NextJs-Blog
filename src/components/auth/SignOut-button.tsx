"use client";
import { signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();
  async function handleOnSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  }
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={handleOnSignOut}
        className="cursor-pointer"
      >
        Sign Out
      </Button>
    </div>
  );
}

export default SignOutButton;
