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
  const { data: articlesWoSentiment, error: sentimentError } =
    await supabaseClient.from("Articles").select("*").is("pos_sentiment", null);

  if (sentimentError) console.log("Sentiment Error: ", sentimentError);

  await Promise.all(
    articlesWoSentiment?.map(
      async (articleWoSentiment: articlesTableStructure) => {
        const sentiments: sentimentList = await HGclient.textClassification({
          model: "ProsusAI/finbert",
          inputs:
            articleWoSentiment.headline + " - " + articleWoSentiment.summary,
          provider: "hf-inference",
        });

        const positive =
          sentiments.find((s) => s.label === "positive")?.score ?? 0;
        const negative =
          sentiments.find((s) => s.label === "negative")?.score ?? 0;

        const { error } = await supabaseClient
          .from("Articles")
          .update({
            pos_sentiment: positive,
            neg_sentiment: negative,
          })
          .eq("id", articleWoSentiment.id);

        if (error) {
          console.error(
            "Failed to update article",
            articleWoSentiment.id,
            error,
          );
        }
      },
    ) ?? [],
  );
  return NextResponse.json({ articles });
}
