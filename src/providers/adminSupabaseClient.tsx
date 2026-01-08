import { createClient } from "@supabase/supabase-js";

export type articlesTableStructure = {
  id: number;
  company: string;
  headline: string;
  date_time: string;
  source: string;
  summary: string;
  url: string;
  pos_sentiment: number;
  neg_sentiment: number;
};

export const supabaseClient = createClient(
  process.env.SP_PROJECT_URL!,
  process.env.SB_SECRET_KEY!
);
