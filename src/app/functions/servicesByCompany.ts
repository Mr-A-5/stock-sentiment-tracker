import { supabaseClient } from "@/providers/adminSupabaseClient";
import { auth } from "@clerk/nextjs/server";

export default async function getServicesByCompany() {
  const { userId: userID } = await auth();

  const { data: servicesData } = await supabaseClient
    .from("Services")
    .select("*");

  const { data: companyData } = await supabaseClient
    .from("Companies")
    .select("id, name");

  const { data: currentServices } = await supabaseClient
    .from("Services_by_User_Company")
    .select("service, company_id")
    .eq("user_id", userID);

  const servicesByCompany: Record<
    string,
    { Name: string; Services: { id: string; name: string }[] }
  > = {};

  companyData?.forEach((company) => {
    servicesData?.forEach((service) => {
      if (!servicesByCompany[company.id]) {
        servicesByCompany[company.id] = { Name: company.name, Services: [] };
      }
      servicesByCompany[company.id]["Services"].push({
        id: service.id,
        name: service.service,
      });
    });
  });

  currentServices?.forEach((serviceOwned) => {
    servicesByCompany[serviceOwned.company_id] = {
      Name: servicesByCompany[serviceOwned.company_id]["Name"],
      Services: servicesByCompany[serviceOwned.company_id]["Services"].filter(
        (service) => service.id != serviceOwned.service,
      ),
    };
  });

  const filteredData = Object.keys(servicesByCompany)
    .filter((key) => servicesByCompany[key].Services.length > 0)
    .reduce(
      (
        obj: Record<
          string,
          { Name: string; Services: { id: string; name: string }[] }
        >,
        key,
      ) => {
        obj[key] = servicesByCompany[key];
        return obj;
      },
      {},
    );

  return filteredData;
}
