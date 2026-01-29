import RequestServicesForm from "@/components/organism/RequestServicesForm";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div
      className="flex flex-col bg-white min-h-screen pt-8 rounded-b-xl items-center justify-center h-fit pb-5 px-4 w-full
    lg:px-0"
    >
      <RequestServicesForm locale={locale} />
    </div>
  );
}
