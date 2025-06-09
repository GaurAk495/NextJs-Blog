import { format } from "date-fns";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  description: string;
  content: string | null;
  createdAt: Date | null;
  authorName: string | null;
}

function PostContainer({ post }: { post: Post }) {
  const slugUrl = post.title.replaceAll(" ", "-").toLowerCase();
  return (
    <div
      key={post.id}
      className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition"
    >
      <Link
        href={`/posts/${slugUrl}`}
        className="hover:underline hover:decoration-blue-500"
      >
        <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
      </Link>
      <p className="text-sm text-gray-500 mb-2">
        By {post.authorName} —{" "}
        {post.createdAt
          ? format(new Date(post.createdAt), "PPP")
          : "Unknown date"}
      </p>
      <p className="text-gray-700">{post.description}</p>
      {post.content && (
        <p className="mt-2 text-gray-900 text-sm line-clamp-3">
          {post.content}
        </p>
      )}
    </div>
  );
}

export default PostContainer;
