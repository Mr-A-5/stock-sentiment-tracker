import { MarketStatus } from "../molecules/MarketStatus";
import { SentimentGraph } from "./SentimentGraph";
import { getUserArticles } from "@/app/functions/articles";
import StrikePrices from "../molecules/StrikePrices";
import { getOptionData } from "@/app/functions/optionData";
import NewsCarousel from "../molecules/NewsCarousel";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type service = {
  service: string;
  visible: boolean;
};

type ServicesDashboardProps = {
  company: string;
  company_Id: string;
  services: service[];
  locale: string;
};

export default async function ServicesDashboard({
  company,
  company_Id,
  services,
  locale,
}: ServicesDashboardProps) {
  const articles = await getUserArticles(company_Id);
  let positive = 0;
  let negative = 0;

  articles.forEach((article) => {
    positive += article.pos_sentiment / articles.length;
    negative += article.neg_sentiment / articles.length;
  });

  const data = [
    { sentiment: "Positive", value: Number((positive * 100).toFixed(2)) },
    {
      sentiment: "Neutral",
      value: Number(((1 - positive - negative) * 100).toFixed(2)),
    },
    { sentiment: "Negative", value: Number((negative * 100).toFixed(2)) },
  ];

  const servicesMap = Object.fromEntries(
    services.map((s) => [s.service, s.visible]),
  );
  const companyData = await getOptionData(company);
  return (
    <div className="h-fit bg-white/30 rounded-xl shadow-xl p-2 pt-0">
      <h1 className="text-xl w-fit px-6 pt-5 pb-3 font-extrabold">{company}</h1>
      <div>
        <div
          className="flex
        flex-col sm:items-center
        lg:flex-row"
        >
          {servicesMap["Articles Sentiment Graph"] && (
            <SentimentGraph data={data} locale={locale} />
          )}
          {servicesMap["Most Bought Strikes"] && (
            <StrikePrices companyData={companyData} locale={locale} />
          )}
          {servicesMap["Market Status"] && (
            <MarketStatus volume={companyData.volume} locale={locale} />
          )}
        </div>
        <div
          className="flex
        flex-col sm:items-center
        lg:flex-row"
        >
          {servicesMap["Articles Sentiment"] && !(articles.length === 0) && (
            <NewsCarousel articles={articles} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
}
