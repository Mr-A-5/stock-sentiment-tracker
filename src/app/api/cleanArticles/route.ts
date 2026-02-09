import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

function getYesterdaysDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  const isVercelCron = request.headers.get("x-vercel-cron");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && !isVercelCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
