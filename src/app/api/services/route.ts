import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function GET() {
  const { data: services, error } = await supabaseClient
    .from("Services")
    .select("id, service");

  if (error) {
    throw error;
  }
  return NextResponse.json(services);
}
