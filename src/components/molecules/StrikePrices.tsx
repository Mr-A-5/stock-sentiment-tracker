import React from "react";
import Card from "../atoms/Card";
import descriptions from "@/assets/descriptions";

export default function StrikePrices({
  companyData,
}: {
  companyData: { put_strike: number; call_strike: number; volume: number };
}) {
  return (
    <Card
      title={"Most Bought Strikes"}
      width="md"
      height="md"
      description={descriptions.MostBoughtStrikes}
    >
      <div className="flex flex-col justify-center items-center text-lg font-semibold text-white h-full">
        <div className="flex flex-col bg-sent-green w-7/10 items-center p-3 rounded-t-3xl">
          <h1>Calls Strike</h1>
          <h2>{companyData.call_strike}</h2>
        </div>
        <div className="flex flex-col bg-sent-red w-7/10 items-center p-3 px-1 rounded-b-3xl">
          <h2>{companyData.put_strike}</h2>
          <h1>Puts Strike</h1>
        </div>
      </div>
    </Card>
  );
}
