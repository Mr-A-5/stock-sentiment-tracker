import { supabaseClient } from "@/providers/adminSupabaseClient";
import { clerkAuthentication } from "./clerkAuth";

type UserServiceRow = {
  company: string;
  company_id: string;
  service: string;
};

export type servicesByCompany = {
  company: string;
  company_id: string;
  services: service[];
};

type service = {
  service: string;
  visible: boolean;
};

type ServicesMap = Record<string, servicesByCompany>;

export async function getUserServices(): Promise<servicesByCompany[]> {
  const userId = await clerkAuthentication();

  const { data: articles, error } = await supabaseClient
    .from("user_services")
    .select("service, company, company_id")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  let serviceByCompany: servicesByCompany[] = [];

  if (articles) {
    serviceByCompany = Object.values(
      articles.reduce<ServicesMap>(
        (acc, { company, service, company_id }: UserServiceRow) => {
          if (!acc[company]) {
            acc[company] = { company, company_id, services: [] };
          }
          acc[company].services.push({ service: service, visible: true });
          return acc;
        },
        {},
      ),
    );
  }

  return serviceByCompany;
}
