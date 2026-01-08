
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response =  await axios.post(
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
          `${process.env.SCHWAB_API_KEY}:${process.env.SCHWAB_API_SECRET}`
        ).toString("base64"),
    },
  }
);
    return NextResponse.json(response.data);
}