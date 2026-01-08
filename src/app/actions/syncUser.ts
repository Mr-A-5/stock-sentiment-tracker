"use server";

import { supabaseClient } from "../../providers/adminSupabaseClient";

export async function syncUserToSupabase(
  userId: string,
  email: string,
  name: string,
) {
  const { data: authUser, error: authError } =
    await supabaseClient.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        clerk_id: userId,
        name,
      },
    });

  if (authError && authError.message !== "User already registered") {
    return;
  }

  await supabaseClient.from("Users").upsert({
    id: userId,
    supabase_uid: authUser?.user?.id,
    email,
    name,
  });
}
