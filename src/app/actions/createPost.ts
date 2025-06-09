"use server";

import { auth } from "@/lib/auth";
import { postFormValue } from "../posts/create/page";
import { headers } from "next/headers";
import { postsTable } from "@/db/schema";
import db from "@/index";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createPost(data: postFormValue) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user) {
    return { success: false, error: "You must be Logged in Create Post" };
  }
  const author = String(session?.user.id);
  const { content, description, title } = data;
  const postExistWithSameTitle = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.title, title))
    .limit(1);
  if (postExistWithSameTitle.length > 0) {
    return {
      success: false,
      error: "This title has already been used. Try something unique",
    };
  }
  const post: typeof postsTable.$inferInsert = {
    title,
    description,
    content,
    author,
  };
  await db.insert(postsTable).values(post);
  revalidatePath("/posts");
  return { success: true, message: "Post Created Successfully!" };
}
