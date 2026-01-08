import { Carousel as FlowBiteCarousel } from "flowbite-react";
export function Carousel() {
  return (
    <FlowBiteCarousel
      indicators={true}
      className="h-120 w-full justify-center "
    >
      <div className="flex flex-row h-50 min-h-fit gap-x-4 w-full justify-center">
        <div className="flex flex-col min-h-35 w-60 h-fit rounded-2xl border-2">
          <h1 className="p-2 border-b-2 font-semibold min-h-30">
            Australia's Syrah Resources buys more time for Tesla graphite supply
            deal
          </h1>
          <p className="p-2 min-h-60">
            Jan 19 () - Australia's Syrah Resources said on Monday it agreed
            with Tesla to extend for the third time a ​deadline to resolve an
            alleged breach of their graphite supply ‌agreement. The 2021
            agreement to supply 8,000
          </p>
        </div>
      </div>
    </FlowBiteCarousel>
  );
}
