import ServicesDashboard from "@/components/organism/ServicesDashboard";
import ServicesMenuClient from "@/components/organism/ServicesMenuClient";

type servicesByCompany = {
  company: string;
  company_id: string;
  services: service[];
};

type service = {
  service: string;
  visible: boolean;
};

export default async function page() {
  const serviceList: servicesByCompany[] = [
    {
      company: "TSLA",
      company_id: "5",
      services: [
        { service: "Market Status", visible: true },
        { service: "Articles Sentiment Graph", visible: true },
        { service: "Articles Sentiment", visible: true },
        { service: "Most Bought Strikes", visible: true },
      ],
    },
  ];
  return (
    <div className="bg-transparent flex h-fit min-h-full align-start rounded-xl">
      <ServicesMenuClient servicesByCompany={serviceList} />
      <div className=" bg-white flex flex-col w-full rounded-b-xl p-2 pt-0 gap-2">
        {serviceList.map(({ company, services, company_id }) => (
          <div
            key={company + services}
            className="w-full rounded-br-xl bg-sent-gray rounded-b-xl p-4"
          >
            <ServicesDashboard
              company={company}
              company_Id={company_id}
              services={services}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
