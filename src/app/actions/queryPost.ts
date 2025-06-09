import { eq, ilike } from "drizzle-orm";
import { postsTable, user } from "@/db/schema";
import db from "@/index";

export default async function getPost(title: string) {
  if (!title) {
    return { success: false, error: "please provide post id" };
  }

  const dbtitle = title.replaceAll("-", " ");
  const [post] = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      description: postsTable.description,
      content: postsTable.content,
      createdAt: postsTable.createdAt,
      authorId: postsTable.author,
      author: user.name,
    })
    .from(postsTable)
    .leftJoin(user, eq(postsTable.author, user.id))
    .where(ilike(postsTable.title, dbtitle))
    .limit(1);

  return { success: true, data: post };
}
