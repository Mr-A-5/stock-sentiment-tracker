import { HomePageButtons } from "../components/molecules/homePageButtons";

export default function Home() {
  return (
    <div
      className="flex flex-col bg-white md:grid md:grid-cols-12 md:grid-rows-3 md:gap-x-3 rounded-b-xl
    pb-10 pt-5
    sm:pb-20 sm:pt-20"
    >
      <div
        className="p-6 pt-0 flex flex-col items-center justify-center
      md:col-start-2 md:col-end-8"
      >
        <h1
          className="font-extrabold text-[38px]/10
        md:text-[48px]/14"
        >
          Automate The Busy Work Of Trading.
        </h1>
        <h2
          className="pt-4 text-[18px]/6 
        md:text-[24px]/8"
        >
          Track sentiment, monitor options, and request custom trading tools —
          all in one place.
        </h2>
        <HomePageButtons />
      </div>
      <img
        src="/images/eps.png"
        alt="EPS icon"
        className="hidden sm:flex sm:col-start-8 sm:col-end-13 h-full max-h-85"
      ></img>
      <p
        className="row-start-2 row-end-3 col-start-7 col-end-12 items-center p-6 
      md:text-[16px] md:px-1 md:font-semibold"
      >
        We provide on-demand automation tools designed to simplify trading
        workflows. Our platform helps traders eliminate repetitive tasks by
        offering services such as stock sentiment analysis, option contract
        price tracking, and other data-driven tools for specific companies.
      </p>
      <img
        src="/images/demo.png"
        alt="SMG"
        className="row-start-2 row-end-3 col-start-2 col-end-7 sm:h-full sm:max-h-85
        px-8
        md:px-0"
      ></img>

      <p
        className="flex col-start-2 col-end-7 items-center 
      p-6
      md:text-[16px] md:px-1 md:font-semibold"
      >
        Users can select the services they need, track the assets they care
        about, and receive automated insights without manual effort. If a
        service isn’t available yet, users can request custom tools through a
        simple form — helping shape future features. Our goal is to make trading
        preparation and analysis faster, clearer, and more efficient.
      </p>
      <img
        src="/images/requestPage.png"
        alt="SMG"
        className="flex justify-center items-center col-start-7 col-end-12 h-full max-h-90
        px-6
        md:px-0"
      ></img>
    </div>
  );
}
