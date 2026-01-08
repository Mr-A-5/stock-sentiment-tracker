import { supabaseClient } from "@/providers/adminSupabaseClient";
import { clerkAuthentication } from "./clerkAuth";

export async function getOptionData(
  ticket: string,
): Promise<{ put_strike: number; call_strike: number; volume: number }> {
  const { data, error } = await supabaseClient
    .from("Companies")
    .select("put_strike, call_strike, volume")
    .eq("name", ticket);
  if (error) {
    console.log("Error fetching strike prices:", error);
    throw new Error("Error fetching strike prices");
  }
  return data[0];
}
