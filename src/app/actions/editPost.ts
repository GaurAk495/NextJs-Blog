"use server";
import { postsTable } from "@/db/schema";
import db from "@/index";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface updatePost {
  id: number;
  editInfo: {
    title: string;
    description: string;
    content: string;
  };
}

export default async function updatePost({ id, editInfo }: updatePost) {
  const { content, description, title } = editInfo;

  const [session, [post]] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1),
  ]);

  if (!session) {
    return { success: false, error: "You must be signed In." };
  }

  if (session.user.id !== post.author) {
    return {
      success: false,
      error: "You are not authorized to make edits on this post",
    };
  }

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

  try {
    await db
      .update(postsTable)
      .set({
        content,
        description,
        title,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, id));
    revalidatePath("/posts");
    return { success: true, message: "Post Updated Succesfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Server error" };
  }
}
