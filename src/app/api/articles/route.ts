import { auth } from "@clerk/nextjs";
import { supabaseClient } from "@/providers/adminSupabaseClient";

type userServicesType = {
  company: string;
  service: string;
};

type ServicesByCompany = {
  company: string;
  services: string[];
};

type ServicesMap = Record<string, ServicesByCompany>;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    console.log("ID", userId);
    console.log("Unauthorized");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: articles, error } = await supabaseClient
    .from("user_services")
    .select("service,company")
    .eq("user_id", userId);

  let serviceByCompany = {};
  if (articles) {
    serviceByCompany = Object.values(
      articles.reduce<ServicesMap>(
        (acc, { company, service }: userServicesType) => {
          if (!acc[company]) {
            acc[company] = { company, services: [] };
          }

          acc[company].services.push(service);
          return acc;
        },
        {},
      ),
    );
  }

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ serviceByCompany });
}
