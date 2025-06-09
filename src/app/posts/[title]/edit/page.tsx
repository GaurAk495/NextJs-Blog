import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Server function to fetch post data
import getPost from "@/app/actions/queryPost";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import EditPostForm from "@/components/layout/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;
  const sessionPromise = auth.api.getSession({ headers: await headers() });
  const postPromise = getPost(title);

  const [session, postRes] = await Promise.all([sessionPromise, postPromise]);
  const { data: post } = postRes;

  if (!post) {
    return notFound();
  }

  if (session?.user.id !== post?.authorId) {
    return (
      <div>
        <p>You're Not Allowed to Edit the post.</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center py-24 px-4 sm:px-6 lg:px-8 bg-muted min-h-screen">
      <Card className="w-full max-w-3xl shadow-xl border border-border">
        <CardHeader className="text-center space-y-1 pb-0">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Edit Post
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the post content and details below
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <EditPostForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
}
