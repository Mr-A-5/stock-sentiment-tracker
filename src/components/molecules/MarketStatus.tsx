import React from "react";
import { GiChargingBull } from "react-icons/gi";
import { GiBearHead } from "react-icons/gi";
import Card from "../atoms/Card";
import descriptions from "@/assets/descriptions";

export function MarketStatus({ volume }: { volume: number }) {
  return (
    <Card
      title="Market Status"
      className=""
      height="md"
      width="md"
      description={descriptions.marketStatus}
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
