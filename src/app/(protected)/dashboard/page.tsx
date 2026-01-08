import { getUserServices } from "@/app/functions/services";
import ServicesDashboard from "@/components/organism/ServicesDashboard";
import ServicesMenuClient from "@/components/organism/ServicesMenuClient";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export default async function page() {
  const serviceMap = await getUserServices();
  return (
    <div className="flex h-fit min-h-full align-start rounded-xl">
      {serviceMap.length !== 0 ? (
        <>
          <ServicesMenuClient servicesByCompany={serviceMap} />
          <div className="bg-white p-2 pt-0 flex flex-col w-full rounded-b-xl gap-2 ">
            {serviceMap.map(({ company, services, company_id }) => (
              <div
                key={company + services}
                className="w-full rounded-xl bg-sent-gray p-4"
              >
                <ServicesDashboard
                  company={company}
                  company_Id={company_id}
                  services={services}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white w-full h-200 flex pt-60 justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="w-80 text-xl">
              No services have been added to your account yet. Please contact us
              to be able to add any services to your account.
            </p>
            <Link href={"/requestService"}>
              <CiCirclePlus size={50} className="text-sent-purple" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
