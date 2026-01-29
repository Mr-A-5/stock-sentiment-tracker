import { GiChargingBull } from "react-icons/gi";
import { GiBearHead } from "react-icons/gi";
import Card from "../atoms/Card";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

export function MarketStatus({
  volume,
  locale,
}: {
  volume: number;
  locale: string;
}) {
  const text = locales[locale] ?? en;

  return (
    <Card
      title={text["Market Status"].Title}
      className=""
      height="md"
      width="md"
      description={text["Market Status"].Description}
    >
      <div className="flex h-full justify-center items-center ">
        {volume > 0 ? (
          <GiChargingBull size={175} className="text-sent-green" />
        ) : (
          <GiBearHead size={175} className="text-sent-red" />
        )}
      </div>
    </Card>
  );
}
