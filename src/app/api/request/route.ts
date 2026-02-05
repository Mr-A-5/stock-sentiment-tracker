import { supabaseClient } from "@/providers/adminSupabaseClient";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user_id = (await auth()).userId;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const { email, selections } = body;

    if (!user_id || !selections?.length) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const rowsToInsert = selections.flatMap(
      (row: { company_id: number; service_ids: number[] }) =>
        row.service_ids.map((service_id) => ({
          user_id,
          company_id: row.company_id,
          service: service_id,
        })),
    );

    const { error } = await supabaseClient
      .from("Services_by_User_Company")
      .insert(rowsToInsert);

    if (error) throw error;

    return NextResponse.json({ success: true, inserted: rowsToInsert });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
