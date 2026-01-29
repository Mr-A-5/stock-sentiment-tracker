import Card from "../atoms/Card";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

export default function StrikePrices({
  companyData,
  locale,
}: {
  companyData: { put_strike: number; call_strike: number; volume: number };
  locale: string;
}) {
  const text = locales[locale] ?? en;
  return (
    <Card
      title={text["Most Bought Strikes"].Title}
      width="md"
      height="md"
      description={text["Most Bought Strikes"].Description}
    >
      <div className="flex flex-col justify-center items-center text-lg font-semibold text-white h-full sm:max-w-3/5 lg:max-w-4/5 mx-auto">
        <div className="flex flex-col bg-sent-green w-9/10 lg:w-9/10 xl:w-4/5 items-center p-3 rounded-t-3xl">
          <h1 className="text-center">Calls Strike</h1>
          <h2>{companyData.call_strike}</h2>
        </div>
        <div className="flex flex-col bg-sent-red w-9/10 lg:w-9/10 xl:w-4/5 items-center p-3 px-1 rounded-b-3xl">
          <h2 className="text-center">{companyData.put_strike}</h2>
          <h1>Puts Strike</h1>
        </div>
      </div>
    </Card>
  );
}
