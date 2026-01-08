export type finnhubCompanyNew = {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

const apiKey = process.env.FINNHUB_API_KEY;
const finnhub = require("finnhub");
export const finnhubClient = new finnhub.DefaultApi(apiKey);
