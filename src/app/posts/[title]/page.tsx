import getPost from "@/app/actions/queryPost";
import DeletePostButton from "@/components/layout/DeletePostButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Edit } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

async function PostPage({ params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const { error: errmessage, data: post } = await getPost(title);
  if (!post) {
    return notFound();
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthor = post.author === session?.user.name;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border border-border bg-background">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          <p className="text-sm text-muted-foreground">
            By{" "}
            <span className="font-medium text-foreground">{post.author}</span> •{" "}
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown date"}
          </p>

          <p className="text-lg text-muted-foreground">{post.description}</p>

          <div className="prose prose-neutral max-w-none">
            {post.content || (
              <span className="italic text-muted-foreground">
                No content available.
              </span>
            )}
          </div>
        </CardContent>

        {isAuthor && (
          <CardFooter className="p-6 border-t flex gap-4">
            <Link href={`/posts/${title}/edit`} passHref>
              <Button
                variant="outline"
                className="flex gap-2 items-center cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <DeletePostButton postId={post.id} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default PostPage;
