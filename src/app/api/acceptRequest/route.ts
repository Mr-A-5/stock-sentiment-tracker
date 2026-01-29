import { supabaseClient } from "@/providers/adminSupabaseClient";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user_id = (await auth()).userId;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: role } = await supabaseClient
      .from("Users")
      .select("role")
      .eq("id", user_id)
      .single();

    if (role?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { user_id: clientID, companies } = body as {
      user_id: string;
      companies: Record<string, string[]>;
    };
    const rowsToInsert = Object.entries(companies).flatMap(
      ([company, services]: [string, string[]]) =>
        services.map((service) => ({
          service,
          user_id: clientID,
          company_id: company,
        })),
    );

    const { error: insertError } = await supabaseClient
      .from("Services_by_User_Company")
      .insert(rowsToInsert);

    if (insertError) {
      console.log("Error creating Service Mapping");
      console.log(insertError);
      return NextResponse.json(
        { error: "Error creating Service Mapping" },
        { status: 400 },
      );
    }

    const { error: deleteError } = await supabaseClient
      .from("Requests")
      .delete()
      .eq("user_id", clientID);

    if (deleteError) {
      console.log("Error deleting accepted requests");
      return NextResponse.json(
        { error: "Error deleting accepted requests" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, inserted: rowsToInsert.length },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
