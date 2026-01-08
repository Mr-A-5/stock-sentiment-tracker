import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerk = await auth();

  if (!clerk.userId) redirect("/sign-in");

  const { data } = await supabaseClient
    .from("Users")
    .select("role")
    .eq("id", clerk.userId)
    .single();

  if (data?.role !== "admin") redirect("/");

  return <>{children}</>;
}
