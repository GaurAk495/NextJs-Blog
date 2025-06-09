"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import updatePost from "@/app/actions/editPost";
import { useRouter } from "next/navigation";
import { useState } from "react";

const editPostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must be at most 255 characters"),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(255, "Description must be at most 255 characters"),

  content: z
    .string({ required_error: "Content is required" })
    .min(20, "Content must be at least 20 characters"),
});

type post = {
  id: number;
  title: string;
  description: string;
  content: string | null;
  createdAt: Date | null;
  authorId: string;
  author: string | null;
};

function EditPostForm({ post }: { post: post }) {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const parseResult = editPostSchema.safeParse(data);
    if (!parseResult.success) {
      const firstError =
        parseResult.error.errors[0]?.message || "Invalid input";
      return toast.error(firstError);
    }
    try {
      const { error, success, message } = await updatePost({
        id: post.id,
        editInfo: parseResult.data,
      });
      if (error) {
        return toast.error(error);
      }
      toast.success(message);
      router.push(
        `/posts/${parseResult.data.title.replaceAll(" ", "-").toLowerCase()}`
      );
    } catch (error) {
      error instanceof Error && toast.error(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-6">
      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Title
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={post.title}
          placeholder="Enter post title"
          required
          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          disabled={isPending}
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description
        </label>
        <Input
          id="description"
          name="description"
          defaultValue={post.description}
          placeholder="Enter post description"
          disabled={isPending}
          required
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="content"
          className="text-sm font-medium text-foreground"
        >
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content || ""}
          placeholder="Write your post content here..."
          className="min-h-48 resize-none"
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        className="w-full text-base font-medium tracking-wide"
        disabled={isPending}
      >
        Save Changes
      </Button>
    </form>
  );
}

export default EditPostForm;
