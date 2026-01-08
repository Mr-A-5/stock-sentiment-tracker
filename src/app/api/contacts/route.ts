import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, description } = body;

  if (!email || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  const { error } = await supabaseClient.from("Contacts").insert({
    name,
    email,
    phone,
    description,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
