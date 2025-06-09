"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletePostById } from "@/app/actions/deletePost";

function DeletePostButton({ postId }: { postId: number }) {
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  async function handleOnDelete() {
    try {
      setPending(true);
      const { success, error, message } = await deletePostById(postId);
      if (error) {
        return toast.error(error);
      }
      toast.success(message);
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      variant={"destructive"}
      className="cursor-pointer"
      disabled={isPending}
      onClick={handleOnDelete}
    >
      Delete
    </Button>
  );
}

export default DeletePostButton;
