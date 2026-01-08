import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function GET() {
  const { data: companies, error } = await supabaseClient
    .from("Companies")
    .select("id, name");

  if (error) {
    throw error;
  }
  return NextResponse.json(companies);
}
