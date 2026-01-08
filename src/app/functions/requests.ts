import { supabaseClient } from "@/providers/adminSupabaseClient";
import { clerkAuthentication } from "./clerkAuth";

type RequestType = {
  request_id: string;
  company_id: string;
  user_id: string;
  service_id: string;
  company_name: string;
  user_name: string;
  service_name: string;
};

export async function getRequests(): Promise<RequestType[]> {
  const userId = await clerkAuthentication();

  const { data, error } = await supabaseClient.from("RequestsView").select("*");

  if (error) {
    console.log("Error fetching requests", error);
    throw new Error("Error fetching requests");
  }
  return data;
}
