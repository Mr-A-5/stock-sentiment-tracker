import { NextResponse } from "next/server";
import { HGclient, sentimentList } from "@/providers/HGClient";
import {
  type finnhubCompanyNew,
  finnhubClient,
} from "@/providers/finnhubClient";
import {
  type articlesTableStructure,
  supabaseClient,
} from "@/providers/adminSupabaseClient";

function getTodaysDate() {
  const today = new Date();
  return today.toLocaleDateString("en-CA");
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

  const date = getTodaysDate();
  const news: finnhubCompanyNew[] = await new Promise((resolve, reject) => {
    finnhubClient.companyNews(
      ticket,
      date,
      date,
      (error: string, data: finnhubCompanyNew[]) => {
        if (error) reject(error);
        else resolve(data);
      },
    );
  });
  const articles: finnhubCompanyNew[] = news;

  articles.map(async (article) => {
    const { data: upsertArticles, error: upsertError } = await supabaseClient
      .from("Articles")
      .upsert(
        [
          {
            company: companyID[0].id,
            headline: article.headline,
            date_time: date,
            source: article.source,
            summary: article.summary,
            url: article.url,
          },
        ],
        { onConflict: "url" },
      );

    if (upsertError) {
      console.log("Error upserting articles without sentiments", upsertError);
    }
  });
  return NextResponse.json({ articles });
}
