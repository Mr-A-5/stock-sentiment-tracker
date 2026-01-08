import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

function getYesterdaysDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticket: string }> },
) {
  const { ticket } = await params;
  const { data: companyID, error: idError } = await supabaseClient
    .from("Companies")
    .select("id")
    .eq("name", ticket);
  if (idError || !companyID || companyID.length === 0) {
    return NextResponse.json(
      { error: "Company ID fetch error" },
      { status: 500 },
    );
  }
  const yesterdayDate = getYesterdaysDate();

  const { data, error } = await supabaseClient
    .from("Articles")
    .delete()
    .lt("date_time", yesterdayDate);

  if (error) {
    console.error("Error deleting rows:", error.message);
    return;
  }

  return NextResponse.json({ data });
}
