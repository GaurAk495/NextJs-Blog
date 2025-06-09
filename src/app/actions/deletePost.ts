"use server";
import db from "@/index";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePostById(postId: number) {
  if (!postId) {
    return { success: false, error: "please provide PostId" };
  }
  try {
    await db.delete(postsTable).where(eq(postsTable.id, postId));
    revalidatePath("/posts");
    return { success: true, message: " Your Post Delete Successfully" };
  } catch (error) {
    error instanceof Error && console.log(error.message);
    return { success: false, error: "please provide PostId" };
  }
}
