import getServicesByCompany from "@/app/functions/servicesByCompany";
import RequestServicesForm from "@/components/organism/RequestServicesForm";
import { Alert } from "flowbite-react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const text = locales[locale] ?? en;
  const services = await getServicesByCompany();
  return (
    <div
      className="flex flex-col bg-white min-h-screen pt-8 rounded-b-xl items-center justify-center h-fit pb-5 px-4 w-full
    lg:px-0"
    >
      {Object.keys(services).length == 0 ? (
        <Alert color="success" className="mb-4 w-fit px-5">
          {text["Request Services"].allServices}
        </Alert>
      ) : (
        <RequestServicesForm locale={locale} servicesMap={services} />
      )}
    </div>
  );
}
