import { auth } from "@clerk/nextjs/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function adminAuth() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { data: role } = await supabaseClient
      .from("Users")
      .select("role")
      .eq("id", userId)
      .single();

    if (role?.role !== "admin") {
      console.log("Unauthorizes");
    }

    return userId;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
