"use client";
import { createPost } from "@/app/actions/createPost";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must be at most 255 characters")
    .refine((val) => !val.includes("?"), {
      message: "Title cannot contain a question mark",
    }),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(255, "Description must be at most 255 characters"),

  content: z
    .string({ required_error: "Content is required" })
    .min(20, "Content must be at least 20 characters"),
});

export type postFormValue = z.infer<typeof postSchema>;

function CreatePost() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<postFormValue>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
    },
  });
  async function onSubmit(data: postFormValue) {
    setPending(true);
    try {
      const { error, message } = await createPost(data);
      if (error) {
        return toast.error(error);
      }
      toast.success(message);
      router.push("/posts");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Server Error While Creating Post");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="flex justify-center mt-20">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your title "
                        {...field}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Description "
                        {...field}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                        className="min-h-60 resize-none"
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={pending}
              >
                Create Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
