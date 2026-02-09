import { HomePageButtons } from "../../components/molecules/homePageButtons";
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

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const text = locales[locale] ?? en;
  return (
    <div
      className="flex flex-col items-center justify-center bg-white md:grid md:grid-cols-12 md:grid-rows-2 md:gap-x-3 rounded-b-xl
    pb-10 pt-5
    sm:pb-20 sm:pt-30"
    >
      <div
        className="p-6 pt-0 flex flex-col items-center justify-center
      md:col-start-2 md:col-end-8 md:pt-10"
      >
        <h1
          className="font-extrabold text-[38px]/10
        md:text-[48px]/14"
        >
          {text.Home.Hero}
        </h1>
        <h2
          className="pt-4 text-[18px]/6 
        md:text-[24px]/8"
        >
          {text.Home.HeroSubTitle}
        </h2>
        <HomePageButtons locale={locale} />
      </div>
      <img
        src="/images/Bull.png"
        alt="Bull icon"
        className="hidden sm:flex sm:col-start-9 sm:col-end-13  justify-center items-center h-full max-h-70"
      ></img>
      <p
        className="row-start-2 row-end-3 col-start-2 col-end-12 items-center p-6 
      md:text-[16px] md:px-1 md:font-semibold"
      >
        {text.Home.Text}
      </p>
    </div>
  );
}
