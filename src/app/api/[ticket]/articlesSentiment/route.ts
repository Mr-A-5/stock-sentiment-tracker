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
  const { data: articlesWoSentiment, error: sentimentError } =
    await supabaseClient.from("Articles").select("*").is("pos_sentiment", null);

  if (sentimentError) console.log("Sentiment Error: ", sentimentError);
  let articles;
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

        const { data: updatedArticles, error } = await supabaseClient
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
        articles = updatedArticles;
      },
    ) ?? [],
  );
  return NextResponse.json({ articles });
}
