"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUserToSupabase } from "../../app/actions/syncUser";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    syncUserToSupabase(
      user.id,
      user.emailAddresses[0].emailAddress,
      user.fullName || ""
    );
  }, [user]);

  return null;
}
