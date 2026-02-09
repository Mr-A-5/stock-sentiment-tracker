import { NextResponse } from "next/server";
import axios from "axios";
import { supabaseClient } from "@/providers/adminSupabaseClient";

const SCHWAB_BASE_URL = process.env.SCHWAB_BASE_URL!;

type contractType = {
  putCall: string;
  symbol: string;
  description: string;
  exchangeName: string;
  bid: number;
  ask: number;
  last: number;
  mark: number;
  bidSize: number;
  askSize: number;
  bidAskSize: string;
  lastSize: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  totalVolume: number;
  tradeTimeInLong: number;
  quoteTimeInLong: number;
  netChange: number;
  volatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  openInterest: number;
  timeValue: number;
  theoreticalOptionValue: number;
  theoreticalVolatility: number;
  optionDeliverablesList: [[Object]];
  strikePrice: number;
  expirationDate: string;
  daysToExpiration: number;
  expirationType: string;
  lastTradingDay: number;
  multiplier: number;
  settlementType: string;
  deliverableNote: string;
  percentChange: number;
  markChange: number;
  markPercentChange: number;
  intrinsicValue: number;
  extrinsicValue: number;
  optionRoot: string;
  exerciseType: string;
  high52Week: number;
  low52Week: number;
  inTheMoney: boolean;
  mini: boolean;
  pennyPilot: boolean;
  nonStandard: boolean;
};

type SchwabChainResponse = {
  callExpDateMap: Record<string, Record<string, contractType[]>>;
  putExpDateMap: Record<string, Record<string, contractType[]>>;
  underlyingPrice: number;
};

function daysUntilNextFriday(): number {
  const today = new Date();
  const todayDay = today.getUTCDay();
  const FRIDAY = 5;

  let diff = FRIDAY - todayDay;

  if (diff < 0) diff += 7;

  return diff;
}

function getNextFridayISO(): string {
  const d = new Date();
  const days = daysUntilNextFriday();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticket: string }> },
) {
  const authHeader = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && !isVercelCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { ticket } = await params;

  const { data: companyID, error: idError } = await supabaseClient
    .from("Companies")
    .select("id")
    .eq("name", ticket);
  if (idError || !companyID || companyID.length === 0) {
    return NextResponse.json(
      { error: "Company ID fetch error" },
      { status: 500 },
    );
  }

  const token = await axios.post(
    "https://api.schwabapi.com/v1/oauth/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SCHWAB_REFRESH_TOKEN!,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SCHWAB_API_KEY}:${process.env.SCHWAB_API_SECRET}`,
          ).toString("base64"),
      },
    },
  );

  const auth = token.data.access_token;

  const rangeDate = getNextFridayISO();
  const response = await axios.get(`${SCHWAB_BASE_URL}/marketdata/v1/chains`, {
    params: {
      symbol: `${ticket}`,
      contractType: "ALL",
      strikeCount: 10,
      range: "OTM",
      toDate: `${rangeDate}`,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });

  const expKey = `${rangeDate}:${daysUntilNextFriday()}`;
  const callsByStrike = response.data.callExpDateMap[expKey];
  const putsByStrike = response.data.putExpDateMap[expKey];

  const callContracts = Object.values(callsByStrike) as contractType[][];
  const putContracts = Object.values(putsByStrike) as contractType[][];

  const flatCalls = callContracts.flat();
  const flatPuts = putContracts.flat();

  const bestCall = flatCalls
    .filter((c) => c.delta > 0.25 && c.delta < 0.65)
    .sort((a, b) => b.totalVolume - a.totalVolume)[0];

  const bestPut = flatPuts
    .filter((p) => p.delta < -0.25 && p.delta > -0.65)
    .sort((a, b) => b.totalVolume - a.totalVolume)[0];

  const volumeIndicator =
    (bestCall.totalVolume - bestPut.totalVolume) /
    (bestCall.totalVolume + bestPut.totalVolume);

  const { data: upsertData, error: upsertError } = await supabaseClient
    .from("Companies")
    .upsert([
      {
        id: companyID[0].id,
        name: ticket,
        put_strike: bestPut?.strikePrice,
        call_strike: bestCall.strikePrice,
        volume: volumeIndicator,
      },
    ]);
  if (upsertError) {
    console.log("Second upsert ", upsertError);
    return NextResponse.json({ error: "Upsert error" }, { status: 500 });
  }
  return NextResponse.json({
    call: bestCall.strikePrice,
    put: bestPut?.strikePrice,
    volumeIndicator: volumeIndicator,
  });
}
