export const dynamic = "force-static";
import PostContainer from "@/components/layout/Post";
import { postsTable, user } from "@/db/schema";
import db from "@/index";
import { desc, eq } from "drizzle-orm";

async function PostsPage() {
  const posts = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      description: postsTable.description,
      content: postsTable.content,
      createdAt: postsTable.createdAt,
      authorName: user.name,
    })
    .from(postsTable)
    .leftJoin(user, eq(postsTable.author, user.id))
    .orderBy(desc(postsTable.id));

  if (!posts.length) {
    return (
      <div className="text-center mt-10 text-gray-500">No posts found.</div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;
