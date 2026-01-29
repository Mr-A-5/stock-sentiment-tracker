import { auth } from "@clerk/nextjs/server";

export async function clerkAuthentication() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return userId;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
