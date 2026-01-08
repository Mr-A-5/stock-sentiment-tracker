import { supabaseClient } from "@/providers/adminSupabaseClient";
import { articlesTableStructure } from "@/providers/adminSupabaseClient";

export async function getUserArticles(
  company: string,
): Promise<articlesTableStructure[]> {
  const { data: articles, error } = await supabaseClient
    .from("Articles")
    .select(
      "id, company, headline, date_time, source, summary, url, pos_sentiment, neg_sentiment",
    )
    .eq("TSLA", company);

  if (error) {
    throw error;
  }

  return articles;
}
